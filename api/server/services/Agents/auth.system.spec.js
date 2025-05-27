const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { SystemRoles } = require('librechat-data-provider');
const { generateSystemUserToken } = require('./auth');
const { getOrCreateAgentUser } = require('~/models/Agent');

// Mock the jwt library
jest.mock('jsonwebtoken');
// Mock the logger
jest.mock('~/config', () => ({
  logger: {
    error: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
  },
}));

// Mock the Agent model
jest.mock('~/models/Agent', () => {
  return {
    getOrCreateAgentUser: jest.fn().mockResolvedValue('mock-system-user-id'),
    Agent: {
      findOne: jest.fn().mockResolvedValue({
        id: 'test-agent-id',
        name: 'Test Agent',
        lean: jest.fn().mockReturnThis(),
      }),
      updateOne: jest.fn().mockResolvedValue({}),
    },
  };
});

// Mock User model
jest.mock('~/models/User', () => {
  return {
    findById: jest.fn().mockResolvedValue(null),
    findOne: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue({
      _id: 'mock-user-id',
      name: 'Agent System User',
    }),
  };
});

describe('Agent System User Authentication', () => {
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

  describe('generateSystemUserToken', () => {
    it('should generate a valid JWT token for a system user', async () => {
      // Mock jwt.sign to return a test token
      jwt.sign.mockReturnValue('system-user-test-token');

      const agent_id = 'agent-123';
      const token = await generateSystemUserToken(agent_id);

      // Check if getOrCreateAgentUser was called correctly
      expect(getOrCreateAgentUser).toHaveBeenCalledWith(agent_id);

      // Check if jwt.sign was called with correct parameters
      expect(jwt.sign).toHaveBeenCalledWith(
        expect.objectContaining({
          role: SystemRoles.AGENT_SYSTEM,
        }),
        'test-secret'
      );

      // Check if the function returns the token
      expect(token).toBe('system-user-test-token');
    });

    it('should throw an error if JWT_SECRET is not defined', async () => {
      // Remove JWT_SECRET from environment
      delete process.env.JWT_SECRET;

      await expect(generateSystemUserToken('agent-123')).rejects.toThrow(
        'JWT_SECRET is not defined in environment variables'
      );
    });

    it('should throw an error if system user creation fails', async () => {
      // Mock getOrCreateAgentUser to throw an error
      getOrCreateAgentUser.mockRejectedValueOnce(new Error('Failed to create system user'));

      await expect(generateSystemUserToken('agent-123')).rejects.toThrow(
        'Failed to create system user'
      );
    });
  });
});
