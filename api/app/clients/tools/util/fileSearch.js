const { z } = require('zod');
const axios = require('axios');
const { tool } = require('@langchain/core/tools');
const { Tools, EToolResources } = require('librechat-data-provider');
const { getFiles } = require('~/models/File');
const { getAgent } = require('~/models/Agent');
const User = require('~/models/User');
const signPayload = require('~/server/services/signPayload');
const { logger } = require('~/config');

/**
 *
 * @param {Object} options
 * @param {ServerRequest} options.req
 * @param {Agent['tool_resources']} options.tool_resources
 * @returns {Promise<{
 *   files: Array<{ file_id: string; filename: string }>,
 *   toolContext: string
 * }>}
 */
const primeFiles = async (options) => {
  const { tool_resources } = options;
  const file_ids = tool_resources?.[EToolResources.file_search]?.file_ids ?? [];
  const agentResourceIds = new Set(file_ids);
  const resourceFiles = tool_resources?.[EToolResources.file_search]?.files ?? [];
  const dbFiles = ((await getFiles({ file_id: { $in: file_ids } })) ?? []).concat(resourceFiles);

  let toolContext = `- Note: Semantic search is available through the ${Tools.file_search} tool but no files are currently loaded. Request the user to upload documents to search through.`;

  const files = [];
  for (let i = 0; i < dbFiles.length; i++) {
    const file = dbFiles[i];
    if (!file) {
      continue;
    }
    if (i === 0) {
      toolContext = `- Note: Use the ${Tools.file_search} tool to find relevant information within:`;
    }
    toolContext += `\n\t- ${file.filename}${
      agentResourceIds.has(file.file_id) ? '' : ' (just attached by user)'
    }`;
    files.push({
      file_id: file.file_id,
      filename: file.filename,
    });
  }

  return { files, toolContext };
};

/**
 * Generate a JWT token for the agent's author
 * @param {string} entity_id - The agent ID
 * @returns {Promise<string|null>} The JWT token or null if error
 */
const generateAuthorToken = async (entity_id) => {
  try {
    // Get agent info
    const agent = await getAgent({ id: entity_id });
    if (!agent || !agent.author) {
      logger.debug(`[${Tools.file_search}] Agent not found or missing author`);
      return null;
    }
    
    const authorId = agent.author.toString();
    
    // Get author user info
    const author = await User.findOne({ _id: authorId }).lean();
    if (!author) {
      logger.debug(`[${Tools.file_search}] Author user not found: ${authorId}`);
      return null;
    }
    
    // Create JWT token payload
    const payload = {
      id: author._id.toString(),
      username: author.username || '',
      email: author.email || '',
      name: author.name || '',
      role: author.role || 'USER',
      provider: author.provider || 'local',
    };
    
    // Sign token with short expiration time
    const JWT_SECRET = process.env.JWT_SECRET;
    const token = await signPayload({
      payload,
      secret: JWT_SECRET,
      expirationTime: '10m',
    });
    
    logger.debug(`[${Tools.file_search}] Author token generated for user: ${author.name || author.username}`);
    return token;
  } catch (error) {
    logger.error(`[${Tools.file_search}] Error generating author token:`, error);
    return null;
  }
};

/**
 * Perform a search query against the RAG API
 * @param {Object} options
 * @param {Array<{ file_id: string; filename: string }>} options.files - Files to search
 * @param {string} options.query - Search query
 * @param {string} options.jwtToken - JWT token for authentication
 * @param {string} [options.entity_id] - Entity ID for the query
 * @returns {Promise<Array|null>} Search results or null if error/no results
 */
const performSearch = async ({ files, query, jwtToken, entity_id }) => {
  try {
    /**
     * Create query body for a file
     * @param {import('librechat-data-provider').TFile} file
     * @returns {{ file_id: string, query: string, k: number, entity_id?: string }}
     */
    const createQueryBody = (file) => {
      const body = {
        file_id: file.file_id,
        query,
        k: 5,
      };
      if (entity_id) {
        body.entity_id = entity_id;
        logger.debug(`[${Tools.file_search}] RAG API /query body`, body);
      }
      return body;
    };

    const queryPromises = files.map((file) =>
      axios
        .post(`${process.env.RAG_API_URL}/query`, createQueryBody(file), {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        })
        .catch((error) => {
          logger.error('Error encountered in `file_search` while querying file:', error);
          return null;
        }),
    );

    const results = await Promise.all(queryPromises);
    const validResults = results.filter((result) => result !== null);

    if (validResults.length === 0) {
      return null;
    }

    return validResults;
  } catch (error) {
    logger.error(`[${Tools.file_search}] Error in performSearch:`, error);
    return null;
  }
};

/**
 * Format search results into a readable string
 * @param {Array} validResults - Valid search results
 * @returns {string} Formatted string of results
 */
const formatResults = (validResults) => {
  const formattedResults = validResults
    .flatMap((result) =>
      result.data.map(([docInfo, distance]) => ({
        filename: docInfo.metadata.source.split('/').pop(),
        content: docInfo.page_content,
        distance,
      })),
    )
    // Sort by distance (lower is better)
    .sort((a, b) => a.distance - b.distance)
    // Take top 10 results
    .slice(0, 10);

  return formattedResults
    .map(
      (result) =>
        `File: ${result.filename}\nRelevance: ${1.0 - result.distance.toFixed(4)}\nContent: ${
          result.content
        }\n`,
    )
    .join('\n---\n');
};

/**
 *
 * @param {Object} options
 * @param {ServerRequest} options.req
 * @param {Array<{ file_id: string; filename: string }>} options.files
 * @param {string} [options.entity_id]
 * @returns {Promise<Tool>}
 */
const createFileSearchTool = async ({ req, files, entity_id }) => {
  return tool(
    async ({ query }) => {
      if (files.length === 0) {
        return 'No files to search. Instruct the user to add files for the search.';
      }
      const jwtToken = req.headers.authorization.split(' ')[1];
      if (!jwtToken) {
        return 'There was an error authenticating the file search request.';
      }

      // Try search with current user token
      const results = await performSearch({ files, query, jwtToken, entity_id });
      
      // If results found, format and return them
      if (results && results.length > 0) {
        return formatResults(results);
      }
      
      // No results found, try with author token if entity_id is available
      if (entity_id) {
        logger.info(`[${Tools.file_search}] No results found with user token, trying with author token`);
        
        // Generate author token
        const authorToken = await generateAuthorToken(entity_id);
        if (!authorToken) {
          logger.warn(`[${Tools.file_search}] Could not generate author token for entity_id: ${entity_id}`);
          return 'No results found or errors occurred while searching the files.';
        }
        
        // Try search again with author token
        const authorResults = await performSearch({ 
          files, 
          query, 
          jwtToken: authorToken,
          entity_id 
        });
        
        // If results found with author token, format and return them
        if (authorResults && authorResults.length > 0) {
          logger.info(`[${Tools.file_search}] Results found using author token`);
          return formatResults(authorResults);
        }
      }
      
      // Still no results
      return 'No results found or errors occurred while searching the files.';
    },
    {
      name: Tools.file_search,
      description: `Performs semantic search across attached "${Tools.file_search}" documents using natural language queries. This tool analyzes the content of uploaded files to find relevant information, quotes, and passages that best match your query. Use this to extract specific information or find relevant sections within the available documents.`,
      schema: z.object({
        query: z
          .string()
          .describe(
            'A natural language query to search for relevant information in the files. Be specific and use keywords related to the information you\'re looking for. The query will be used for semantic similarity matching against the file contents.',
          ),
      }),
    },
  );
};

module.exports = { createFileSearchTool, primeFiles };
