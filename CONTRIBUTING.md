# Contributing to Pacifica TypeScript SDK

Thank you for your interest in contributing to the Pacifica TypeScript SDK! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Project Structure](#project-structure)
- [Architecture Guidelines](#architecture-guidelines)

## Code of Conduct

We are committed to providing a welcoming and inclusive experience for everyone. Be respectful, considerate, and collaborative.

## Getting Started

### Prerequisites

- **Node.js**: >=18.0.0
- **npm**: Latest version
- **Git**: For version control

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:

```bash
git clone https://github.com/YOUR_USERNAME/pacifica-ts.git
cd pacifica-ts
```

3. Add the upstream repository:

```bash
git remote add upstream https://github.com/kesar/pacifica-ts.git
```

## Development Setup

1. **Install dependencies**:

```bash
npm install
```

2. **Verify your setup**:

```bash
# Run type checking
npm run typecheck

# Run linting
npm run check

# Run tests
npm test

# Build the package
npm run build
```

## Development Workflow

### Creating a Branch

Create a feature branch from `main`:

```bash
git checkout main
git pull upstream main
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Test additions or modifications
- `chore/` - Maintenance tasks

### Making Changes

1. **Make your changes** following our [Code Standards](#code-standards)
2. **Run tests** to ensure nothing breaks:

```bash
npm test
```

3. **Check code quality**:

```bash
# Run linting and formatting
npm run check

# Auto-fix issues where possible
npm run check:fix
```

4. **Verify type safety**:

```bash
npm run typecheck
```

5. **Test the build**:

```bash
npm run build
```

### Commit Messages

We follow conventional commit format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples**:

```
feat(api): add support for batch order cancellation

Adds a new method to cancel multiple orders in a single request,
improving performance for bulk operations.

Closes #123
```

```
fix(websocket): handle reconnection edge case

Fixes an issue where the WebSocket client would not properly
resubscribe to channels after an unexpected disconnection.

Fixes #456
```

## Code Standards

### TypeScript Guidelines

- **Strict mode**: All code must pass TypeScript strict checks
- **No `any` types**: Use proper typing; leverage `unknown` for truly unknown types
- **Explicit return types**: Add return types to all public methods
- **Use `const` and `let`**: Never use `var`
- **Prefer immutability**: Use `const` by default

### Formatting and Linting

We use **Biome** for both linting and formatting:

- **Indentation**: 2 spaces
- **Line width**: 120 characters
- **Quotes**: Single quotes for strings
- **Semicolons**: Always required
- **Trailing commas**: ES5 style

Run `npm run check:fix` to automatically format your code.

### Documentation

- **JSDoc comments**: Required for all public APIs
- Include `@param`, `@returns`, `@throws`, and `@example`
- Mark authentication requirements with "**Requires authentication**"
- Use markdown formatting in descriptions

Example:

```typescript
/**
 * Creates a new limit order on the exchange.
 *
 * **Requires authentication**
 *
 * @param request - The limit order parameters
 * @returns Promise resolving to the created order details
 * @throws {BusinessLogicError} If the order parameters are invalid
 * @throws {RateLimitError} If rate limit is exceeded
 *
 * @example
 * ```typescript
 * const order = await client.api.createLimitOrder({
 *   symbol: 'BTC',
 *   price: '50000',
 *   amount: '0.1',
 *   side: 'bid',
 *   tif: 'GTC',
 *   reduce_only: false
 * });
 * ```
 */
async createLimitOrder(request: CreateLimitOrderRequest): Promise<CreateOrderResponse> {
  // Implementation
}
```

### Error Handling

- Use typed error classes from `src/types/errors.ts`
- Never swallow errors silently
- Add context to errors when rethrowing
- Document thrown errors with `@throws` tags

### String-Based Numbers

**Critical**: All numeric values representing financial data (prices, amounts, balances) must be strings, not numbers:

```typescript
// ✅ Correct
const order = {
  price: '50000',
  amount: '0.1',
};

// ❌ Incorrect
const order = {
  price: 50000,
  amount: 0.1,
};
```

## Testing Guidelines

### Writing Tests

- **Location**: Tests should be colocated with the source code (e.g., `signer.test.ts` next to `signer.ts`)
- **Framework**: We use Vitest for testing
- **Coverage**: Aim for high test coverage, especially for critical paths
- **Naming**: Use descriptive `describe` and `it` blocks

### Test Structure

```typescript
import { describe, it, expect, beforeEach } from 'vitest';

describe('FeatureName', () => {
  describe('methodName', () => {
    it('should handle normal case', () => {
      // Arrange
      const input = 'test';

      // Act
      const result = someFunction(input);

      // Assert
      expect(result).toBe('expected');
    });

    it('should handle edge case', () => {
      // Test edge cases
    });

    it('should throw error for invalid input', () => {
      expect(() => someFunction(null)).toThrow();
    });
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run dev

# Run tests with coverage
npm run test:coverage
```

### Test Guidelines

- Test public APIs, not implementation details
- Test both success and failure cases
- Test edge cases and boundary conditions
- Mock external dependencies (network calls, timers, etc.)
- Keep tests focused and independent

## Pull Request Process

### Before Submitting

1. **Update documentation** if you changed APIs
2. **Add tests** for new features or bug fixes
3. **Ensure all checks pass**:
   ```bash
   npm run check
   npm run typecheck
   npm test
   npm run build
   ```
4. **Update CHANGELOG.md** (if applicable)
5. **Rebase on latest main**:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

### Submitting

1. **Push your branch** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request** on GitHub with:
   - **Clear title** following conventional commit format
   - **Description** explaining:
     - What changes you made
     - Why you made them
     - How to test them
   - **Link to related issues** (e.g., "Closes #123")
   - **Screenshots/examples** if applicable

3. **Respond to feedback** from reviewers
4. **Keep your PR updated** with the latest main branch

### PR Review Process

- PRs require at least one approval from a maintainer
- All CI checks must pass
- Address all review comments or explain why you disagree
- Maintain a professional and collaborative tone

## Project Structure

```
pacifica-ts/
├── src/
│   ├── client/          # API and WebSocket client implementations
│   │   ├── Client.ts    # Main PacificaClient facade
│   │   ├── ApiClient.ts # REST API client
│   │   └── WebSocketClient.ts  # WebSocket client
│   ├── types/           # TypeScript type definitions
│   │   ├── api.ts       # API request/response types
│   │   ├── common.ts    # Domain types
│   │   ├── events.ts    # WebSocket event types
│   │   └── errors.ts    # Error classes
│   ├── utils/           # Utility functions
│   │   ├── signer.ts    # Request signing utilities
│   │   └── errors.ts    # Error handling utilities
│   └── index.ts         # Main entry point
├── examples/            # Usage examples
├── .github/             # GitHub Actions workflows
├── dist/                # Build output (generated)
├── biome.json           # Biome configuration
├── tsconfig.json        # TypeScript configuration
├── vitest.config.ts     # Vitest configuration
├── package.json         # Package manifest
├── README.md            # User documentation
├── CONTRIBUTING.md      # This file
└── CLAUDE.md            # AI coding assistant instructions
```

## Architecture Guidelines

### Facade Pattern

The SDK uses a facade pattern with `PacificaClient` as the main entry point:

```typescript
const client = new PacificaClient(config);
client.api.getMarketInfo();  // REST API
client.ws.subscribePrices(); // WebSocket
```

### Type Safety

- **100% type-safe**: All APIs are fully typed
- **WebSocket events**: Use generic EventEmitter for type-safe event handling
- **No type assertions**: Avoid `as` unless absolutely necessary

### Request Signing

All authenticated requests are signed using Solana keypairs:

1. Create signature header with timestamp and operation type
2. Recursively sort all JSON keys
3. Create compact JSON (no whitespace)
4. Sign with Solana keypair
5. Attach signature to request

See `src/utils/signer.ts` for implementation details.

### WebSocket Management

- **Automatic reconnection** with exponential backoff
- **Subscription persistence** across reconnections
- **Heartbeat mechanism** to detect stale connections
- **Type-safe events** using EventEmitter3

## Questions or Issues?

- **Documentation**: Check the [README](README.md) and [CLAUDE.md](CLAUDE.md)
- **Bugs**: Open an issue on GitHub
- **Questions**: Use GitHub Discussions or Discord
- **Security**: Email security concerns privately (see SECURITY.md if available)

Thank you for contributing to Pacifica TypeScript SDK!
