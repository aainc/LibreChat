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
  logger.info(`[DEBUG_AUTHOR_FALLBACK] 🔑 Attempting to generate author token for entity_id: ${entity_id}`);
  
  try {
    // Get agent info
    logger.info(`[DEBUG_AUTHOR_FALLBACK] 🔍 Fetching agent data for ID: ${entity_id}`);
    const startAgentFetch = Date.now();
    const agent = await getAgent({ id: entity_id });
    const agentFetchTime = Date.now() - startAgentFetch;
    
    logger.info(`[DEBUG_AUTHOR_FALLBACK] ⏱️ Agent fetch completed in ${agentFetchTime}ms`);
    
    if (!agent) {
      logger.error(`[DEBUG_AUTHOR_FALLBACK] ❌ Agent not found for entity_id: ${entity_id}`);
      return null;
    }
    
    if (!agent.author) {
      logger.error(`[DEBUG_AUTHOR_FALLBACK] ❌ Agent exists but has no author field. Agent data:`, 
        JSON.stringify({
          id: agent.id,
          name: agent.name,
          hasAuthorField: !!agent.author,
          authorType: agent.author ? typeof agent.author : 'undefined'
        })
      );
      return null;
    }
    
    const authorId = agent.author.toString();
    logger.info(`[DEBUG_AUTHOR_FALLBACK] 👤 Resolved author ID: ${authorId} from agent`);
    
    // Get author user info
    logger.info(`[DEBUG_AUTHOR_FALLBACK] 🔍 Fetching author user data for ID: ${authorId}`);
    const startAuthorFetch = Date.now();
    const author = await User.findOne({ _id: authorId }).lean();
    const authorFetchTime = Date.now() - startAuthorFetch;
    
    logger.info(`[DEBUG_AUTHOR_FALLBACK] ⏱️ Author fetch completed in ${authorFetchTime}ms`);
    
    if (!author) {
      logger.error(`[DEBUG_AUTHOR_FALLBACK] ❌ Author user not found with ID: ${authorId}`);
      return null;
    }
    
    logger.info(`[DEBUG_AUTHOR_FALLBACK] ✅ Author user found: ${author.name || author.username || authorId}`);
    
    // Create JWT token payload
    const payload = {
      id: author._id.toString(),
      username: author.username || '',
      email: author.email || '',
      name: author.name || '',
      role: author.role || 'USER',
      provider: author.provider || 'local',
    };
    
    logger.info(`[DEBUG_AUTHOR_FALLBACK] 📝 Creating JWT token with payload:`, 
      JSON.stringify({
        id: payload.id,
        username: payload.username ? '✓' : '✗',
        email: payload.email ? '✓' : '✗',
        name: payload.name ? '✓' : '✗',
        role: payload.role,
        provider: payload.provider
      })
    );
    
    // Sign token with short expiration time
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      logger.error(`[DEBUG_AUTHOR_FALLBACK] ❌ JWT_SECRET is not defined in environment`);
      return null;
    }
    
    logger.info(`[DEBUG_AUTHOR_FALLBACK] 🔐 Signing JWT token with expiration: 10m`);
    const startTokenSign = Date.now();
    
    const token = await signPayload({
      payload,
      secret: JWT_SECRET,
      expirationTime: '10m',
    });
    
    const tokenSignTime = Date.now() - startTokenSign;
    logger.info(`[DEBUG_AUTHOR_FALLBACK] ⏱️ Token signing completed in ${tokenSignTime}ms`);
    
    if (!token) {
      logger.error(`[DEBUG_AUTHOR_FALLBACK] ❌ Failed to generate token - returned null/undefined`);
      return null;
    }
    
    logger.info(`[DEBUG_AUTHOR_FALLBACK] ✅ Successfully generated author token. First 10 chars: ${token.substring(0, 10)}...`);
    return token;
  } catch (error) {
    logger.error(`[DEBUG_AUTHOR_FALLBACK] ❌ Error generating author token:`, error);
    logger.error(`[DEBUG_AUTHOR_FALLBACK] 📋 Error stack trace:`, error.stack);
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
 * @param {string} [options.tokenType] - Type of token being used (user/author)
 * @returns {Promise<Array|null>} Search results or null if error/no results
 */
const performSearch = async ({ files, query, jwtToken, entity_id, tokenType = 'user' }) => {
  const searchStartTime = Date.now();
  logger.info(`[DEBUG_AUTHOR_FALLBACK] 🔎 Starting file search with ${tokenType} token. Query: "${query}"`);
  logger.info(`[DEBUG_AUTHOR_FALLBACK] 📋 Files to search: ${files.length}, Entity ID: ${entity_id || 'none'}`);
  logger.info(`[DEBUG_AUTHOR_FALLBACK] 🔐 Token first 10 chars: ${jwtToken ? jwtToken.substring(0, 10) : 'undefined'}...`);
  
  if (!jwtToken) {
    logger.error(`[DEBUG_AUTHOR_FALLBACK] ❌ JWT token is undefined or null`);
    return null;
  }
  
  if (!process.env.RAG_API_URL) {
    logger.error(`[DEBUG_AUTHOR_FALLBACK] ❌ RAG_API_URL is not defined in environment`);
    return null;
  }
  
  logger.info(`[DEBUG_AUTHOR_FALLBACK] 🌐 RAG API URL: ${process.env.RAG_API_URL}`);
  
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
      }
      return body;
    };

    // Log the file details
    files.forEach((file, index) => {
      logger.info(`[DEBUG_AUTHOR_FALLBACK] 📄 File ${index + 1}/${files.length}: ID=${file.file_id}, Name=${file.filename}`);
    });
    
    const queryPromises = files.map((file, index) => {
      const body = createQueryBody(file);
      logger.info(`[DEBUG_AUTHOR_FALLBACK] 📤 Sending request ${index + 1}/${files.length} for file: ${file.filename}`);
      logger.info(`[DEBUG_AUTHOR_FALLBACK] 📝 Request body: ${JSON.stringify(body)}`);
      
      return axios
        .post(`${process.env.RAG_API_URL}/query`, body, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
          timeout: 30000, // 30 second timeout
        })
        .then(response => {
          logger.info(`[DEBUG_AUTHOR_FALLBACK] ✅ Response received for ${file.filename}, status: ${response.status}`);
          logger.info(`[DEBUG_AUTHOR_FALLBACK] 📊 Response data length: ${response.data ? response.data.length : 0}`);
          return response;
        })
        .catch((error) => {
          logger.error(`[DEBUG_AUTHOR_FALLBACK] ❌ Error querying file ${file.filename}:`, error.message);
          
          // Log detailed error information
          if (error.response) {
            // The request was made and the server responded with a non-2xx status
            logger.error(`[DEBUG_AUTHOR_FALLBACK] 🔴 Response status: ${error.response.status}`);
            logger.error(`[DEBUG_AUTHOR_FALLBACK] 🔴 Response headers:`, JSON.stringify(error.response.headers));
            logger.error(`[DEBUG_AUTHOR_FALLBACK] 🔴 Response data:`, JSON.stringify(error.response.data));
          } else if (error.request) {
            // The request was made but no response was received
            logger.error(`[DEBUG_AUTHOR_FALLBACK] 🟠 No response received from server`);
            logger.error(`[DEBUG_AUTHOR_FALLBACK] 🟠 Request details:`, error.request);
          } else {
            // Something happened in setting up the request
            logger.error(`[DEBUG_AUTHOR_FALLBACK] 🟡 Error setting up request:`, error.message);
          }
          
          if (error.config) {
            logger.error(`[DEBUG_AUTHOR_FALLBACK] 📋 Request URL: ${error.config.url}`);
            logger.error(`[DEBUG_AUTHOR_FALLBACK] 📋 Request method: ${error.config.method}`);
            logger.error(`[DEBUG_AUTHOR_FALLBACK] 📋 Request headers:`, JSON.stringify(error.config.headers));
          }
          
          return null;
        });
    });

    logger.info(`[DEBUG_AUTHOR_FALLBACK] ⏳ Waiting for ${queryPromises.length} search requests to complete...`);
    const requestStartTime = Date.now();
    const results = await Promise.all(queryPromises);
    const requestTime = Date.now() - requestStartTime;
    logger.info(`[DEBUG_AUTHOR_FALLBACK] ⏱️ All search requests completed in ${requestTime}ms`);
    
    const validResults = results.filter((result) => result !== null);
    logger.info(`[DEBUG_AUTHOR_FALLBACK] 📊 Valid responses: ${validResults.length}/${results.length}`);

    if (validResults.length === 0) {
      logger.info(`[DEBUG_AUTHOR_FALLBACK] ⚠️ No valid results found with ${tokenType} token`);
      return null;
    }

    // Check if results actually contain data
    let totalHits = 0;
    validResults.forEach((result, index) => {
      const hits = result.data ? result.data.length : 0;
      totalHits += hits;
      logger.info(`[DEBUG_AUTHOR_FALLBACK] 📊 Result ${index + 1} has ${hits} hits`);
    });
    
    if (totalHits === 0) {
      logger.info(`[DEBUG_AUTHOR_FALLBACK] ⚠️ Results were returned but contain no actual matches`);
      return null;
    }
    
    const searchEndTime = Date.now();
    const totalSearchTime = searchEndTime - searchStartTime;
    logger.info(`[DEBUG_AUTHOR_FALLBACK] ✅ Search completed successfully with ${tokenType} token in ${totalSearchTime}ms, found ${totalHits} hits`);
    
    return validResults;
  } catch (error) {
    logger.error(`[DEBUG_AUTHOR_FALLBACK] ❌ Unexpected error in performSearch with ${tokenType} token:`, error);
    logger.error(`[DEBUG_AUTHOR_FALLBACK] 📋 Error stack trace:`, error.stack);
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
  logger.info(`[DEBUG_AUTHOR_FALLBACK] 🛠️ Creating file search tool with entity_id: ${entity_id || 'none'}`);
  logger.info(`[DEBUG_AUTHOR_FALLBACK] 📂 Number of files available: ${files.length}`);
  
  return tool(
    async ({ query }) => {
      const toolStartTime = Date.now();
      logger.info(`[DEBUG_AUTHOR_FALLBACK] 🚀 File search tool called with query: "${query}"`);
      
      if (files.length === 0) {
        logger.info(`[DEBUG_AUTHOR_FALLBACK] ⚠️ No files to search`);
        return 'No files to search. Instruct the user to add files for the search.';
      }
      
      // Log summary of available files
      logger.info(`[DEBUG_AUTHOR_FALLBACK] 📋 Available files for search:`);
      files.forEach((file, index) => {
        logger.info(`[DEBUG_AUTHOR_FALLBACK]   ${index + 1}. ${file.filename} (ID: ${file.file_id})`);
      });
      
      // Get JWT token from request
      let jwtToken;
      try {
        if (!req.headers.authorization) {
          logger.error(`[DEBUG_AUTHOR_FALLBACK] ❌ No authorization header found in request`);
          return 'There was an error authenticating the file search request.';
        }
        
        const authParts = req.headers.authorization.split(' ');
        if (authParts.length !== 2 || authParts[0] !== 'Bearer') {
          logger.error(`[DEBUG_AUTHOR_FALLBACK] ❌ Invalid authorization header format: ${req.headers.authorization}`);
          return 'There was an error authenticating the file search request.';
        }
        
        jwtToken = authParts[1];
        if (!jwtToken) {
          logger.error(`[DEBUG_AUTHOR_FALLBACK] ❌ JWT token is empty in authorization header`);
          return 'There was an error authenticating the file search request.';
        }
        
        logger.info(`[DEBUG_AUTHOR_FALLBACK] 🔐 Extracted JWT token from request. First 10 chars: ${jwtToken.substring(0, 10)}...`);
      } catch (error) {
        logger.error(`[DEBUG_AUTHOR_FALLBACK] ❌ Error extracting JWT token:`, error);
        return 'There was an error authenticating the file search request.';
      }

      // Step 1: Try search with current user token
      logger.info(`[DEBUG_AUTHOR_FALLBACK] 🔍 Step 1: Attempting search with USER token`);
      const userStartTime = Date.now();
      const results = await performSearch({ 
        files, 
        query, 
        jwtToken, 
        entity_id,
        tokenType: 'user'
      });
      const userSearchTime = Date.now() - userStartTime;
      logger.info(`[DEBUG_AUTHOR_FALLBACK] ⏱️ User token search completed in ${userSearchTime}ms`);
      
      // If results found, format and return them
      if (results && results.length > 0) {
        logger.info(`[DEBUG_AUTHOR_FALLBACK] ✅ Results found with USER token, returning results`);
        const formattedResults = formatResults(results);
        logger.info(`[DEBUG_AUTHOR_FALLBACK] 📝 Formatted results length: ${formattedResults.length} characters`);
        
        const toolEndTime = Date.now();
        const totalToolTime = toolEndTime - toolStartTime;
        logger.info(`[DEBUG_AUTHOR_FALLBACK] ⏱️ Total tool execution time: ${totalToolTime}ms - USER token successful`);
        return formattedResults;
      }
      
      logger.info(`[DEBUG_AUTHOR_FALLBACK] ⚠️ No results found with USER token`);
      
      // Step 2: No results found, try with author token if entity_id is available
      if (entity_id) {
        logger.info(`[DEBUG_AUTHOR_FALLBACK] 🔄 Step 2: No results found with user token, trying with AUTHOR token for entity_id: ${entity_id}`);
        
        // Generate author token
        logger.info(`[DEBUG_AUTHOR_FALLBACK] 🔑 Generating author token...`);
        const tokenStartTime = Date.now();
        const authorToken = await generateAuthorToken(entity_id);
        const tokenGenTime = Date.now() - tokenStartTime;
        logger.info(`[DEBUG_AUTHOR_FALLBACK] ⏱️ Author token generation took ${tokenGenTime}ms`);
        
        if (!authorToken) {
          logger.error(`[DEBUG_AUTHOR_FALLBACK] ❌ Failed to generate author token for entity_id: ${entity_id}`);
          
          const toolEndTime = Date.now();
          const totalToolTime = toolEndTime - toolStartTime;
          logger.info(`[DEBUG_AUTHOR_FALLBACK] ⏱️ Total tool execution time: ${totalToolTime}ms - Failed at author token generation`);
          return 'No results found or errors occurred while searching the files.';
        }
        
        logger.info(`[DEBUG_AUTHOR_FALLBACK] ✅ Successfully generated author token`);
        
        // Try search again with author token
        logger.info(`[DEBUG_AUTHOR_FALLBACK] 🔍 Attempting search with AUTHOR token`);
        const authorStartTime = Date.now();
        const authorResults = await performSearch({ 
          files, 
          query, 
          jwtToken: authorToken,
          entity_id,
          tokenType: 'author'
        });
        const authorSearchTime = Date.now() - authorStartTime;
        logger.info(`[DEBUG_AUTHOR_FALLBACK] ⏱️ Author token search completed in ${authorSearchTime}ms`);
        
        // If results found with author token, format and return them
        if (authorResults && authorResults.length > 0) {
          logger.info(`[DEBUG_AUTHOR_FALLBACK] ✅ Results found using AUTHOR token, returning results`);
          const formattedResults = formatResults(authorResults);
          logger.info(`[DEBUG_AUTHOR_FALLBACK] 📝 Formatted results length: ${formattedResults.length} characters`);
          
          const toolEndTime = Date.now();
          const totalToolTime = toolEndTime - toolStartTime;
          logger.info(`[DEBUG_AUTHOR_FALLBACK] ⏱️ Total tool execution time: ${totalToolTime}ms - AUTHOR token successful`);
          return formattedResults;
        }
        
        logger.info(`[DEBUG_AUTHOR_FALLBACK] ⚠️ No results found with AUTHOR token either`);
      } else {
        logger.info(`[DEBUG_AUTHOR_FALLBACK] ℹ️ No entity_id provided, skipping author token fallback`);
      }
      
      // Step 3: Still no results with either token
      logger.info(`[DEBUG_AUTHOR_FALLBACK] ❌ No results found with either USER or AUTHOR token`);
      
      const toolEndTime = Date.now();
      const totalToolTime = toolEndTime - toolStartTime;
      logger.info(`[DEBUG_AUTHOR_FALLBACK] ⏱️ Total tool execution time: ${totalToolTime}ms - No results found`);
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
