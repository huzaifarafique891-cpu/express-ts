# Express TypeScript Template

A production-ready starter template for building REST APIs with Express and TypeScript, complete with testing, linting, formatting, and type safety.

**Date Published:** Dec 2025

## 🚀 Quick Start

### Prerequisites
- Node.js 24+ (or compatible version)
- npm or yarn

### Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Start production server
npm start
```

## 📋 What's Included

### Core Dependencies
- **Express 5.2.1** - Modern web framework for Node.js
- **TypeScript 5.9** - Type-safe JavaScript
- **Node.js 24** - Latest stable runtime

### Developer Tools

#### Testing
- **Vitest 4.0** - Lightning-fast unit test framework
- **Supertest 7.1** - HTTP assertion library for testing Express routes
- **@vitest/coverage-v8** - Code coverage reporting

#### Code Quality
- **ESLint 9.39** - Static code analysis
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Prettier 3.7** - Code formatter
- **@vitest/eslint-plugin** - Vitest-specific lint rules

#### Git Hooks
- **Husky 9.1** - Git hooks manager
- **lint-staged 16.2** - Run linters on staged files only

#### TypeScript Configuration
- **@tsconfig/node24** - Recommended TypeScript config for Node.js 24

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
├── index.ts             # Express app entry point
├── sum.ts               # Example utility function
└── tests/
    └── unit/
        ├── sum.test.ts  # Unit tests for utilities
        └── vitest.d.ts  # Vitest type definitions
```

## 🧪 Testing Guide

### Running Tests

**Watch Mode (Development)**
```bash
npm test
```

**Single Run (CI/Production)**
```bash
npm test:run
```

**With Coverage Report**
```bash
npm coverage
```

### Example Test with Supertest

Test your Express routes with Supertest:

```typescript
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../../index.js';

describe('GET /api/users', () => {
  it('should return all users', async () => {
    const response = await request(app)
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /json/);
    
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should handle errors', async () => {
    await request(app)
      .get('/api/invalid')
      .expect(404);
  });
});
```

### Test Configuration
- **Environment:** Node.js
- **Globals Enabled:** `describe`, `it`, `expect` available without imports
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
- Configured for TypeScript files: ESLint fix → Prettier format → TypeScript check
- Prettier formatting for JSON and JavaScript files
- Prevents commits with linting or type errors

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

## 💡 Development Workflow

1. **Write TypeScript** in `src/`
2. **Write tests** in `src/tests/`
3. **Check types**: `npm run typecheck`
4. **Lint code**: `npm run lint` (or `npm run lint:fix` to auto-fix)
5. **Format code**: `npm run format`
6. **Run tests**: `npm test`
7. **Commit code**: `git commit` (Husky automatically runs pre-commit checks)
8. **Build**: `npm run build`
9. **Deploy**: `npm start`

## 🤖 Git Hooks with Husky

This template uses **Husky** to automatically enforce code quality on every commit.

### How It Works

When you run `git commit`, the pre-commit hook automatically:
1. ✅ **Fixes ESLint issues** on staged TypeScript files
2. ✅ **Formats code** with Prettier
3. ✅ **Checks TypeScript types** for errors
4. ✅ Commits only if all checks pass

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

## 🔍 Code Quality Best Practices

### TypeScript Strict Mode
- Strict type checking enabled
- No implicit `any` types
- Run `npm run typecheck` before commits

### Linting
- Run `npm run lint:fix` before committing
- ESLint enforces consistent code style
- Vitest-specific rules for test files

### Formatting
- Run `npm run format` to format all files
- Check formatting with `npm run format:check`
- Prettier ensures consistent code style

### Testing
- Write tests alongside features
- Aim for meaningful coverage (> 80%)
- Use Supertest for HTTP endpoint testing

## 📚 Common Tasks

### Adding a New Route
```typescript
// src/api/users.ts
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json([{ id: 1, name: 'John' }]);
});

export default router;
```

### Testing the Route
```typescript
// src/tests/unit/api/users.test.ts
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../../../index.js';

describe('GET /api/users', () => {
  it('should return users', async () => {
    const response = await request(app)
      .get('/api/users')
      .expect(200);
    
    expect(response.body).toBeInstanceOf(Array);
  });
});
```

### Adding Dependencies
```bash
# Production dependency
npm install express-validator

# Development dependency
npm install --save-dev @types/some-package
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| `Cannot find module` errors | Run `npm install` and verify import paths use `.js` extension |
| Type errors after changes | Run `npm run typecheck` |
| Linting errors | Run `npm run lint:fix` |
| Tests failing | Check `npm test` output and review test files |
| Port already in use | Change `PORT` env var or kill process on port 3000 |

## 🔐 Type Safety

This template uses TypeScript strict mode. Key benefits:
- Catch errors at compile time
- Better IDE autocomplete
- Self-documenting code through types
- Easier refactoring

Always aim for proper TypeScript types in your code:
```typescript
// ❌ Avoid
const getUser = (id: any) => { /* ... */ };

// ✅ Preferred
const getUser = (id: number): Promise<User> => { /* ... */ };
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
