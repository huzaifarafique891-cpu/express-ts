# Express TypeScript Template

A production-ready starter template for building REST APIs with Express and TypeScript, complete with testing, linting, formatting, and type safety.

**Date Published:** Dec 2025

## 📚 Table of Contents

- [Quick Start](#-quick-start) - Get up and running in minutes
- [What's Included](#-whats-included) - Core dependencies and developer tools
- [Available Scripts](#-available-scripts) - All npm commands at a glance
- [Project Structure](#-project-structure) - How the code is organized
- [Testing Guide](#-testing-guide) - Writing and running tests
- [Configuration Files](#-configuration-files) - Understanding the config setup
- [Building for Production](#-building-for-production) - Preparing for deployment
- [Docker & Containerization](#-docker--containerization) - Containerize your app
- [Kubernetes Deployment](#️-kubernetes-deployment) - Deploy to Kubernetes
- [Development Workflow](#-development-workflow) - Best practices for daily work
- [Git Hooks with Husky](#-git-hooks-with-husky) - Automated code quality
- [Continuous Integration](#-continuous-integration) - GitHub Actions CI/CD
- [Best Practices](#-best-practices-for-this-template) - Pro tips and patterns
- [Common Tasks](#-common-tasks) - How-to guides for common operations
- [Troubleshooting](#-troubleshooting) - Common issues and solutions
- [Type Safety](#-type-safety) - Getting the most from TypeScript

## 📖 Summary

**What is this?** A complete, production-ready Express API starter with TypeScript, testing, Docker, and Kubernetes support.

**Who is it for?** Developers building REST APIs who want:
- Strong type safety with TypeScript
- Automated testing (unit and integration)
- Enforced code quality (linting, formatting)
- Containerization and orchestration ready
- Best practices out of the box

**Key Features:**
- ✅ **Express 5.2.1** with ES modules
- ✅ **TypeScript 5.9** with strict mode
- ✅ **Vitest 4.0** for fast testing
- ✅ **Husky + lint-staged** for git hooks
- ✅ **Docker & Kubernetes** ready
- ✅ **GitHub Actions** CI/CD pipeline
- ✅ **Prettier + ESLint** for code quality

**Time to productive:** < 5 minutes with the GitHub CLI template command

## 🚀 Quick Start

### Prerequisites

- Node.js 24+ (or compatible version)
- npm or yarn

### Using This Template

#### Option 1: GitHub CLI (Recommended)

```bash
# Create a new repository from this template
gh repo create my-api --template haryati75/express-ts --public

# Or private repository
gh repo create my-api --template haryati75/express-ts --private

# Clone and setup
cd my-api
npm install
```

#### Option 2: Git Clone

```bash
# Clone the repository
git clone https://github.com/haryati75/express-ts.git my-api
cd my-api

# Remove template git history and start fresh
rm -rf .git
git init

# Install dependencies
npm install
```

### Quick Start

Once you've created your project:

```bash
# Start development server
npm run dev

# Run tests in watch mode
npm test

# Build for production
npm run build

# Start production server
npm start
```

**Next Steps:**
1. Update `package.json` with your project name, description, and author
2. Update `README.md` with your project details
3. Set up environment variables in `.env` (copy from `.env.example` if available)
4. Remove example code from `src/sum.ts` and tests
5. Start building your API!

## 📋 What's Included

This template provides everything you need for professional Express API development:

### Core Dependencies

- **Express 5.2.1** - Modern, minimalist web framework
- **TypeScript 5.9** - Type-safe JavaScript with strict mode enabled
- **Node.js 24** - Latest stable runtime with modern JavaScript support

### Developer Tools (Pre-configured)

#### 🧪 Testing Stack
- **Vitest 4.0** - Lightning-fast unit test framework with auto-reload
- **Supertest 7.1** - HTTP assertion library for testing Express endpoints
- **@vitest/coverage-v8** - Comprehensive code coverage reporting

#### 🔍 Code Quality
- **ESLint 9.39** - Enforce consistent code style and catch errors
- **TypeScript ESLint** - Advanced TypeScript-specific lint rules
- **Prettier 3.7** - Automatic code formatting
- **@vitest/eslint-plugin** - Best practices for test files

#### 🎣 Git Integration
- **Husky 9.1** - Automated git hooks for code quality checks
- **lint-staged 16.2** - Run quality tools only on changed files

#### 📦 TypeScript Configuration
- **@tsconfig/node24** - Production-ready TypeScript configuration for Node.js 24

## 📝 Available Scripts

```bash
# Development
npm run dev              # Watch mode with hot reload (tsx watch)

# Building & Running
npm run build            # Compile TypeScript to dist/
npm run start            # Run compiled production build
npm run clean            # Remove dist/ directory

# Testing
npm test                 # Run tests in watch mode
npm test:run             # Run tests once (CI mode)
npm coverage             # Generate code coverage report

# Code Quality
npm run lint             # Check for linting issues
npm run lint:fix         # Fix linting issues automatically
npm run format           # Format code with Prettier
npm run format:check     # Check formatting without changes
npm run typecheck        # Check TypeScript types without building
```

## 🏗️ Project Structure

```
src/
├── index.ts              # Express app entry point (export app, start server)
├── routes/               # API route handlers (create as needed)
│   └── index.ts
├── middleware/           # Express middleware (create as needed)
├── utils/                # Helper functions and utilities
├── types/                # TypeScript type definitions
└── tests/
    ├── unit/             # Unit tests for utilities and functions
    │   └── sum.test.ts
    ├── e2e/              # End-to-end tests for API routes
    ├── helper/           # Test utilities and fixtures
    └── vitest.d.ts
```

**Note:** The example `sum.ts` file is for demonstration. Replace it with your actual business logic.

## 🧪 Testing Guide

### Running Tests

```bash
# Watch mode - auto-rerun on file changes (development)
npm test

# Single run - exits after completion (CI/production)
npm test:run

# With coverage report
npm coverage
```

### Writing Tests

#### Unit Test Example

```typescript
// src/tests/unit/calculator.test.ts
import { describe, it, expect } from 'vitest';
import { add, multiply } from '../../utils/calculator';

describe('Calculator Utils', () => {
  describe('add', () => {
    it('should add two numbers', () => {
      expect(add(2, 3)).toBe(5);
    });
  });

  describe('multiply', () => {
    it('should multiply two numbers', () => {
      expect(multiply(2, 3)).toBe(6);
    });
  });
});
```

#### E2E Test Example (API Route Testing with Supertest)

```typescript
// src/tests/e2e/users.spec.ts
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../../index.js';

describe('GET /api/users', () => {
  it('should return all users with 200 status', async () => {
    const response = await request(app)
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should handle invalid endpoints with 404', async () => {
    await request(app)
      .get('/api/invalid')
      .expect(404);
  });

  it('should validate request body', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ invalid: 'data' })
      .expect(400);

    expect(response.body).toHaveProperty('error');
  });
});
```

### Test Configuration

- **Environment:** Node.js
- **Globals:** `describe`, `it`, `expect` available without imports (auto-imported)
- **Coverage Tracking:** v8 provider configured
- **Coverage Exclusions:** Entry point, test files, dist/, node_modules/

## 🔧 Configuration Files

### `tsconfig.json`

- Extends `@tsconfig/node24` for Node.js 24
- Output: `./dist`
- Includes Vitest global types

### `vitest.config.ts`

- Node environment
- Global test API enabled
- v8 coverage provider configured
- Coverage excludes: node_modules, tests, dist, entry point

### `eslint.config.js`

- ESLint recommended rules
- TypeScript strict type checking
- Vitest plugin for test files
- Ignores compiled JavaScript

### `.lintstagedrc.json`

- Configured for TypeScript files: ESLint fix → Prettier format
- Prettier formatting for JSON and JavaScript files
- Type checking is handled separately in CI/locally via `npm run typecheck`
- Keeps pre-commit hook fast and focused on linting & formatting

### `.husky/pre-commit`

- Runs lint-staged before each commit
- Automatically fixes issues in staged files
- Prevents broken code from being committed

### `.env` Support

Environment variables can be loaded via `--env-file=.env` flag (already configured in npm scripts)

## 📦 Building for Production

### Development Build

```bash
npm run build
```

### Production Deployment

```bash
npm run build
npm start
```

The built application will run from the `dist/` directory.

## 🐳 Docker & Containerization

This project includes Docker support for easy containerization and deployment.

### Project Structure

```
express-ts/
├── Dockerfile           # Production-ready container image
├── docker-compose.yml   # Local development with Docker
├── .dockerignore        # Files excluded from Docker build
└── k8s/                 # Kubernetes deployment configs
    ├── deployment.yaml  # K8s deployment manifest
    ├── service.yaml     # K8s service manifest
    └── README.md        # K8s documentation
```

### Docker Image Details

- **Base Image:** `node:24-alpine` (lightweight, production-ready)
- **Build:** TypeScript compiled to `dist/`
- **Runtime:** Node.js runs compiled JavaScript directly
- **Port:** 3001 (configurable via `PORT` env var)
- **Size:** ~200MB (optimized with Alpine)

### Local Docker Development

#### Option 1: Docker Compose (Recommended for Development)

```bash
# Build and start
docker-compose up

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

**docker-compose.yml features:**
- Auto-rebuilds on code changes
- Loads environment variables
- Exposes port 3001

#### Option 2: Manual Docker Commands

```bash
# Build image
docker build -t express-ts:latest .

# Run container
docker run -p 3001:3001 --env-file=.env express-ts:latest

# Interactive shell
docker run -it express-ts:latest sh
```

### Environment Configuration

**Development (.env.local):**
```
PORT=3000
```

**Production (.env):**
```
PORT=3001
```

**Docker loads from `.env`** - Update as needed for your deployment.

### Docker Cleanup

```bash
# Stop and remove containers
docker-compose down -v

# Remove image
docker rmi express-ts:latest

# Prune all unused resources
docker system prune -a
```

## ☸️ Kubernetes Deployment

Deploy to Kubernetes clusters (local Docker Desktop or production cloud).

### Prerequisites

- Kubernetes cluster running (Docker Desktop K8s or cloud provider)
- `kubectl` CLI installed
- Docker image available (`express-ts:latest`)

### Quick Start

```bash
# Enable Kubernetes in Docker Desktop:
# Settings → Kubernetes tab → Check "Enable Kubernetes" → Apply & Restart

# Deploy
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml

# Check status
kubectl get pods
kubectl get svc

# Access the app
kubectl port-forward svc/express-ts 3001:3001
curl http://localhost:3001

# View logs
kubectl logs -f deployment/express-ts

# Scale to 3 replicas
kubectl scale deployment express-ts --replicas=3

# Cleanup
kubectl delete deployment express-ts
kubectl delete svc express-ts
```

### Kubernetes Manifests

**deployment.yaml:**
- 1 replica (configurable)
- Port 3001 exposed
- Resource requests: 64Mi memory, 50m CPU
- Resource limits: 256Mi memory, 500m CPU
- Image: `express-ts:latest`

**service.yaml:**
- Type: LoadBalancer
- External access on port 3001
- Routes to deployment pods

### Deployment Workflow

```bash
# 1. Build image locally
docker build -t express-ts:latest .

# 2. Deploy to K8s
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml

# 3. Monitor rollout
kubectl rollout status deployment/express-ts

# 4. Test
kubectl port-forward svc/express-ts 3001:3001
# In another terminal: curl http://localhost:3001

# 5. Scale if needed
kubectl scale deployment express-ts --replicas=5

# 6. Update (after code changes)
docker build -t express-ts:latest .
kubectl rollout restart deployment/express-ts
```

### Common Kubernetes Tasks

```bash
# View deployment details
kubectl describe deployment express-ts

# View pod details
kubectl describe pod <pod-name>

# Stream logs from all pods
kubectl logs -f deployment/express-ts

# Execute command in pod
kubectl exec -it <pod-name> -- sh

# Port forward (alternative to LoadBalancer)
kubectl port-forward pod/<pod-name> 3001:3001

# Get all resources
kubectl get all

# Check resource usage
kubectl top pods
kubectl top nodes
```

### Production Deployment

For production Kubernetes deployments, consider:

1. **Image Registry:** Push to Docker Hub, ECR, GCR, etc.
   ```bash
   docker tag express-ts:latest myregistry/express-ts:v1.0
   docker push myregistry/express-ts:v1.0
   ```

2. **Namespace Isolation:**
   ```yaml
   metadata:
     namespace: production
   ```

3. **Resource Scaling:**
   - Increase replicas for load balancing
   - Add HorizontalPodAutoscaler for auto-scaling based on CPU/memory

4. **Health Checks:** Consider adding liveness and readiness probes

5. **Ingress:** Use Ingress controller for better routing

6. **Secrets:** Store sensitive data in K8s Secrets, not in code

7. **Monitoring:** Add Prometheus, Grafana, or similar

### Docker vs Kubernetes

| Aspect | Docker Compose | Kubernetes |
|--------|---|---|
| **Use Case** | Local dev, single server | Production, scaling, multi-node |
| **Complexity** | Simple | Advanced |
| **Scaling** | Manual | Auto-scaling |
| **High Availability** | No | Yes |
| **Learning Curve** | Easy | Steep |
| **Best For** | Development | Enterprise deployments |

**Current Setup:** 
- ✅ Docker Compose for local development
- ✅ Kubernetes configs ready for production use

## 💡 Development Workflow

### Standard Development Process

1. **Start dev server** - `npm run dev` (hot-reload enabled)
2. **Write TypeScript** - Add code in `src/`
3. **Write tests** - Add tests in `src/tests/`
4. **Run tests** - `npm test` (watch mode auto-reruns)
5. **Type check** - `npm run typecheck` (before committing)
6. **Commit** - `git commit` (Husky auto-fixes linting/formatting)
7. **Push** - CI validates all checks
8. **Deploy** - `npm run build && npm start`

### Pre-Commit Quality Gates

Code quality is enforced locally to catch issues early:

```bash
# Automatic (Husky pre-commit hook)
git add .
git commit -m "Your message"
# Husky runs: ESLint fix → Prettier format → commits if clean
```

### Manual Quality Checks

Run these anytime to verify code quality:

```bash
npm run typecheck      # Check TypeScript types
npm run lint           # Check for linting issues
npm run lint:fix       # Fix linting issues automatically
npm run format         # Format all files
npm run format:check   # Check formatting without changing files
```

## 🤖 Git Hooks with Husky

This template uses **Husky** to automatically enforce code quality on every commit.

### How It Works

When you run `git commit`, the pre-commit hook automatically:

1. ✅ **Fixes ESLint issues** on staged TypeScript files
2. ✅ **Formats code** with Prettier
3. ✅ Commits only if linting and formatting pass

**Note:** TypeScript type checking is not included in the pre-commit hook (it runs in CI and can be checked manually with `npm run typecheck`). This keeps commits fast while CI ensures type safety.

### Example

```bash
# Make changes
echo 'const x = 1' >> src/example.ts

# Stage and commit
git add src/example.ts
git commit -m "Add example"

# Output:
# ✔ Backed up original state
# ✔ Running tasks for staged files...
# ✔ Applying modifications from tasks...
# ✔ Cleaning up temporary files...
# [main abc1234] Add example
```

Your code is automatically cleaned up before commit!

### Skip Hooks (Emergency Only)

```bash
git commit --no-verify
```

⚠️ **Only use `--no-verify` in emergencies.** It bypasses all code quality checks.

## 🔄 Continuous Integration (CI)

This project uses GitHub Actions to validate code on every push and pull request.

### CI Pipeline

The CI workflow runs on:

- ✅ Every push to `main` branch
- ✅ Every pull request to `main` branch

### What CI Validates

1. **Tests** - All tests must pass (`npm test:run`)
2. **TypeScript Types** - No type errors allowed (`npm typecheck`)
3. **Code Style** - ESLint validation (`npm lint`)
4. **Code Formatting** - Prettier validation (`npm format:check`)
5. **Coverage Report** - Code coverage metrics (`npm coverage`)

### Developer Expectations

Since **Husky pre-commit hooks** automatically fix linting and formatting issues locally:

| Scenario                 | What Happens                               | Your Action                                                 |
| ------------------------ | ------------------------------------------ | ----------------------------------------------------------- |
| ✅ Code is clean         | CI passes automatically                    | Push and merge normally                                     |
| ❌ Tests fail            | CI fails                                   | Fix the failing tests locally, commit, push again           |
| ❌ Type errors           | CI fails                                   | Fix TypeScript errors, commit, push again                   |
| ⚠️ Linting/format issues | **Should never happen** (Husky fixes them) | If CI fails on lint/format, something went wrong with Husky |

### Why This Approach?

- **Local feedback is fast** - Husky catches issues before push
- **CI validates final state** - Ensures nothing slipped through
- **No time wasted** - CI doesn't re-fix code, only validates
- **Clean git history** - All committed code meets standards

### If CI Fails

1. **Tests failing?** → Fix the code and commit
2. **Type errors?** → Fix types and commit
3. **Lint/format errors?** → Run `npm run lint:fix` and `npm run format` locally, then commit

Husky should prevent lint/format issues from being committed, but if they reach CI, the fix is simple.

## 🎯 Best Practices for This Template

### Project Setup Checklist

- [ ] Update `package.json` with project details
- [ ] Update `README.md` with your API documentation
- [ ] Create `.env` file from `.env.example`
- [ ] Remove example `sum.ts` and tests
- [ ] Set up your first routes
- [ ] Configure any needed middleware (CORS, authentication, etc.)
- [ ] Add database/ORM setup if needed
- [ ] Set up environment-specific configs

### Code Organization

**By Feature (Recommended for larger projects):**
```
src/
├── features/
│   ├── users/
│   │   ├── routes.ts
│   │   ├── controller.ts
│   │   ├── service.ts
│   │   └── tests/
│   ├── posts/
│   │   ├── routes.ts
│   │   ├── controller.ts
│   │   └── tests/
│   └── auth/
│       ├── middleware.ts
│       ├── service.ts
│       └── tests/
├── shared/
│   ├── middleware/
│   ├── utils/
│   ├── types/
│   └── errors/
└── index.ts
```

**By Layer (Recommended for smaller projects):**
```
src/
├── routes/
├── controllers/
├── services/
├── middleware/
├── utils/
├── types/
├── tests/
└── index.ts
```

### TypeScript Tips

1. **Always define return types** - Helps with documentation and catches errors
   ```typescript
   // ❌ Avoid
   const getUser = async (id) => { /* ... */ };
   
   // ✅ Good
   const getUser = async (id: number): Promise<User> => { /* ... */ };
   ```

2. **Use interfaces for request/response types** - Makes API contracts clear
   ```typescript
   interface CreateUserRequest {
     name: string;
     email: string;
   }
   
   interface UserResponse {
     id: number;
     name: string;
     email: string;
     createdAt: Date;
   }
   ```

3. **Leverage TypeScript strict mode** - It's enabled for a reason
   ```typescript
   // Strict mode catches these at compile time
   const value: string = null;        // ❌ Error
   const data: any = {};              // ❌ Avoid
   ```

### Testing Best Practices

1. **Test behavior, not implementation** - Focus on what users/APIs experience
2. **Write tests alongside features** - Not after
3. **Aim for meaningful coverage** - 80%+ coverage is good, but focus on critical paths
4. **Use descriptive test names** - `should return 404 when user not found` is better than `test get user`
5. **Test happy path AND error cases** - Both matter equally

### Git Workflow

1. **Commit frequently** - Small, logical commits are easier to review
2. **Write good commit messages** - Follow conventional commits if possible
   ```bash
   # Good
   git commit -m "feat: add user authentication endpoint"
   git commit -m "fix: handle null values in user service"
   git commit -m "docs: update API documentation"
   
   # Bad
   git commit -m "stuff"
   git commit -m "fixes"
   ```

3. **Push to feature branches** - Create PRs for review
4. **Keep main stable** - All CI checks must pass before merging

## 📚 Common Tasks

### Initializing Your Project

After cloning, customize the template:

```bash
# Update package.json
npm pkg set name="my-api"
npm pkg set description="My awesome API"
npm pkg set author="Your Name"

# Remove example files
rm src/sum.ts
rm src/tests/unit/sum.test.ts

# Create your first route
mkdir -p src/routes
cat > src/routes/health.ts << 'EOF'
import { Router } from 'express';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

export default router;
EOF
```

### Adding a New API Route

**Step 1: Create route handler**

```typescript
// src/routes/users.ts
import { Router, Request, Response } from 'express';

const router = Router();

// GET /users
router.get('/', (req: Request, res: Response) => {
  const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
  ];
  res.json(users);
});

// POST /users
router.post('/', (req: Request, res: Response) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email required' });
  }
  
  const newUser = { id: 3, name, email };
  res.status(201).json(newUser);
});

export default router;
```

**Step 2: Mount route in main app**

```typescript
// src/index.ts
import express from 'express';
import usersRouter from './routes/users.js';

export const app = express();

app.use(express.json());
app.use('/api/users', usersRouter);

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

**Step 3: Write tests**

```typescript
// src/tests/e2e/users.spec.ts
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../../index.js';

describe('Users API', () => {
  describe('GET /api/users', () => {
    it('should return list of users', async () => {
      const response = await request(app)
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /json/);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('email');
    });
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({ name: 'Charlie', email: 'charlie@example.com' })
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('Charlie');
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({ name: 'Charlie' })
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });
});
```

**Step 4: Test it**

```bash
npm test              # Watch mode - tests auto-run
npm test:run          # Single run
```

### Adding Dependencies

```bash
# Production dependencies
npm install express-validator body-parser
npm install cors helmet

# Development dependencies
npm install --save-dev @types/cors @types/helmet
```

### Environment Variables

```bash
# Create .env file (copy from .env.example if it exists)
cp .env.example .env

# Edit .env with your values
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
```

Environment variables are automatically loaded via `--env-file=.env` in npm scripts.

## 🐛 Troubleshooting

| Issue                       | Solution                                                      |
| --------------------------- | ------------------------------------------------------------- |
| `Cannot find module` errors | Run `npm install` and verify import paths use `.js` extension |
| Type errors after changes   | Run `npm run typecheck`                                       |
| Linting errors              | Run `npm run lint:fix`                                        |
| Tests failing               | Check `npm test` output and review test files                 |
| Port already in use         | Change `PORT` env var or kill process on port 3000            |

## 🔐 Type Safety

This template uses TypeScript strict mode. Key benefits:

- Catch errors at compile time
- Better IDE autocomplete
- Self-documenting code through types
- Easier refactoring

Always aim for proper TypeScript types in your code:

```typescript
// ❌ Avoid
const getUser = (id: any) => {
  /* ... */
};

// ✅ Preferred
const getUser = (id: number): Promise<User> => {
  /* ... */
};
```

## 📖 Useful Resources

- [Express Documentation](https://expressjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vitest Documentation](https://vitest.dev/)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [ESLint Documentation](https://eslint.org/docs/)

## 📄 License

ISC

## 👤 Author

Haryati Hassan
