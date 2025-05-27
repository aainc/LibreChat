const jwt = require('jsonwebtoken');
const { logger } = require('~/config');

/**
 * Generates a JWT token for agent authentication
 * This token will be used for file search to identify the agent as the file owner
 * 
 * @param {string} agent_id - The ID of the agent
 * @returns {string} JWT token
 */
function generateAgentToken(agent_id) {
  try {
    // Use the same JWT secret as used for user authentication
    const { JWT_SECRET } = process.env;
    
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    
    // Create a payload that treats the agent as a "user" for authorization purposes
    const payload = {
      id: agent_id,
      role: 'agent', // Special role to identify this is an agent token
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 hours expiration
    };
    
    return jwt.sign(payload, JWT_SECRET);
  } catch (error) {
    logger.error(`Error generating agent token: ${error.message}`);
    throw error;
  }
}

/**
 * Verifies if a token is a valid agent token
 * 
 * @param {string} token - JWT token to verify
 * @returns {Object|null} Decoded token payload if valid, null otherwise
 */
function verifyAgentToken(token) {
  try {
    const { JWT_SECRET } = process.env;
    
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Check if this is an agent token
    if (decoded.role !== 'agent') {
      return null;
    }
    
    return decoded;
  } catch (error) {
    logger.error(`Error verifying agent token: ${error.message}`);
    return null;
  }
}

module.exports = {
  generateAgentToken,
  verifyAgentToken
};
