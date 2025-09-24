# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Development
```bash
# Start backend and frontend concurrently (recommended)
npm run backend:dev    # Backend on port 3080
npm run frontend:dev   # Frontend on port 5173

# Build shared packages before running frontend
npm run build:data-provider
npm run build:api
npm run build:data-schemas
```

### Testing
```bash
# Unit tests
npm run test:client    # Frontend tests
npm run test:api       # Backend tests

# Run specific test files
cd client && npm test -- --testPathPattern="hooks/useLocalize"
cd api && npm test -- --testPathPattern="models/User"

# E2E tests (ensure app is running first)
npm run e2e           # Run Playwright tests
npm run e2e:headed    # Run with browser UI
npm run e2e:debug     # Debug mode
```

### Code Quality
```bash
npm run lint          # Check linting
npm run lint:fix      # Auto-fix linting issues
npm run format        # Format with Prettier
```

### Production Build
```bash
npm run frontend      # Build frontend for production
npm run backend       # Start backend in production mode
```

## Architecture Overview

LibreChat is a monorepo using npm workspaces with three main components:

### Frontend (`/client`)
- React 18 + TypeScript + Vite
- State: Zustand stores in `src/store/`
- Components: `src/components/` with UI primitives in `ui/`
- Data fetching: React Query with hooks in `src/hooks/`
- Routing: React Router v6
- Styling: TailwindCSS with custom components

### Backend (`/api`)
- Node.js/Express server
- Database: MongoDB (Mongoose models in `models/`)
- Auth: Passport.js strategies in `strategies/`
- AI Clients: Provider implementations in `app/clients/`
- Routes: RESTful APIs in `server/routes/`
- Real-time: Server-Sent Events for streaming

### Shared Packages (`/packages`)
- `data-provider`: Shared data fetching utilities
- `api`: LibreChat Agents and MCP tools
- `data-schemas`: Zod schemas for type safety

## Key Development Patterns

### Adding AI Providers
1. Implement client in `api/app/clients/` (extend BaseClient.js)
2. Add endpoint configuration in `api/server/services/Config/getEndpointsConfig.js`
3. Update frontend model selection in `client/src/store/endpoints.ts`
4. Add endpoint initialization in `api/server/services/Endpoints/{provider}/`

### Component Development
- Use TypeScript interfaces for props
- Follow existing patterns in `client/src/components/`
- Utilize shared UI components from `client/src/components/ui/`
- Manage state with Zustand stores

### API Development
- Routes go in `api/server/routes/`
- Business logic in `api/server/services/`
- Use middleware for auth/validation
- Stream responses with SSE for AI completions

### Configuration
- Environment variables: `.env` file (copy from `.env.example`)
- Feature configuration: `librechat.yaml` (optional)
- Model/endpoint settings configured via environment or YAML

## Testing Strategy
- Unit tests: Jest with React Testing Library (frontend), Jest (backend)
- E2E tests: Playwright for critical user flows
- Run tests before committing major changes

## Important Notes
- Always build shared packages before running frontend in development
- MongoDB must be running for backend functionality
- Use proper TypeScript types - avoid `any`
- Follow existing code style and patterns
- Check for existing utilities before creating new ones

## Data Flow Architecture
- **Frontend State**: Zustand stores manage global state with React Query for server state
- **API Communication**: RESTful endpoints with SSE streaming for real-time AI responses
- **File Handling**: Multi-provider file storage (Local, S3, Azure, Firebase) with unified interface
- **Authentication**: Passport.js strategies with JWT tokens and OAuth2 support
- **Database**: MongoDB with Mongoose models for conversations, users, files, and configurations

## Key Configuration Files
- `.env`: Environment variables (copy from `.env.example`)
- `librechat.yaml`: Optional feature configuration
- `client/src/store/endpoints.ts`: Frontend endpoint configuration
- `api/server/services/Config/`: Backend configuration services
- `packages/data-schemas/`: Shared validation schemas

## Commit Guidelines
- Keep commit messages concise and professional
- Avoid excessive self-referential language or marketing-style descriptions
- Focus on the technical change, not the implementation process
- Use conventional commit format: type: brief description