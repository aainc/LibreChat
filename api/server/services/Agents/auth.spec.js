const { generateAgentToken, verifyAgentToken } = require('./auth');
const jwt = require('jsonwebtoken');
const { logger } = require('~/config');

// Mock the jwt library
jest.mock('jsonwebtoken');
// Mock the logger
jest.mock('~/config', () => ({
  logger: {
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

describe('Agent Authentication Service', () => {
  // Save original environment
  const originalEnv = process.env;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    // Setup environment for tests
    process.env = { ...originalEnv };
    process.env.JWT_SECRET = 'test-secret';
  });

  afterEach(() => {
    // Restore original environment
    process.env = originalEnv;
  });

  describe('generateAgentToken', () => {
    it('should generate a valid JWT token with agent role', () => {
      // Mock jwt.sign to return a test token
      jwt.sign.mockReturnValue('test-token');

      const agent_id = 'agent-123';
      const token = generateAgentToken(agent_id);

      // Check if jwt.sign was called with correct parameters
      expect(jwt.sign).toHaveBeenCalledWith(
        expect.objectContaining({
          id: agent_id,
          role: 'agent',
        }),
        'test-secret'
      );

      // Check if the function returns the token
      expect(token).toBe('test-token');
    });

    it('should throw an error if JWT_SECRET is not defined', () => {
      // Remove JWT_SECRET from environment
      delete process.env.JWT_SECRET;

      expect(() => {
        generateAgentToken('agent-123');
      }).toThrow('JWT_SECRET is not defined in environment variables');

      // Check if error was logged
      expect(logger.error).toHaveBeenCalled();
    });
  });

  describe('verifyAgentToken', () => {
    it('should verify a valid agent token', () => {
      // Mock jwt.verify to return a valid decoded token
      jwt.verify.mockReturnValue({
        id: 'agent-123',
        role: 'agent',
      });

      const result = verifyAgentToken('valid-token');

      // Check if jwt.verify was called with correct parameters
      expect(jwt.verify).toHaveBeenCalledWith('valid-token', 'test-secret');

      // Check if the function returns the decoded token
      expect(result).toEqual({
        id: 'agent-123',
        role: 'agent',
      });
    });

    it('should return null for a token with non-agent role', () => {
      // Mock jwt.verify to return a token with a different role
      jwt.verify.mockReturnValue({
        id: 'user-456',
        role: 'user',
      });

      const result = verifyAgentToken('user-token');

      // Check if jwt.verify was called
      expect(jwt.verify).toHaveBeenCalled();

      // Check if the function returns null
      expect(result).toBeNull();
    });

    it('should return null and log error if token verification fails', () => {
      // Mock jwt.verify to throw an error
      jwt.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      const result = verifyAgentToken('invalid-token');

      // Check if error was logged
      expect(logger.error).toHaveBeenCalled();

      // Check if the function returns null
      expect(result).toBeNull();
    });

    it('should throw an error if JWT_SECRET is not defined', () => {
      // Remove JWT_SECRET from environment
      delete process.env.JWT_SECRET;

      const result = verifyAgentToken('some-token');

      // Check if error was logged
      expect(logger.error).toHaveBeenCalled();
      
      // Should return null
      expect(result).toBeNull();
    });
  });
});
