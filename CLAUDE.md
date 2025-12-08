# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript SDK for Pacifica's trading API and WebSocket services. It provides a type-safe, fully-documented interface for interacting with Pacifica's perpetual futures exchange.

## Development Commands

```bash
# Install dependencies
npm install

# Build the library (outputs to dist/)
npm run build

# Development mode with watch (rebuilds on changes)
npm run dev

# Type checking without building
npm run typecheck

# Linting
npm run lint

# Run tests
npm run test

# Run examples (useful for testing)
npm run dev examples/basic-usage.ts
npm run dev examples/websocket-subscriptions.ts
npm run dev examples/trading.ts
```

## Architecture

### Facade Pattern
The SDK uses a **Facade pattern** with three main layers:

1. **PacificaClient** (`src/client/Client.ts`) - Main entry point that combines:
   - `api` property: ApiClient instance for REST API calls
   - `ws` property: WebSocketClient instance for real-time streaming
   - Provides convenience methods: `connect()`, `disconnect()`, `isConnected()`

2. **ApiClient** (`src/client/ApiClient.ts`) - REST API layer:
   - All HTTP requests go through private `request()` and `post()` methods
   - POST requests automatically signed via `Signer` utility
   - Returns typed responses with error handling via `handleHttpError()`

3. **WebSocketClient** (`src/client/WebSocketClient.ts`) - Real-time data layer:
   - Extends `EventEmitter<WebSocketEventMap>` for type-safe events
   - Manages connection lifecycle with automatic reconnection
   - Subscription management with auto-resubscribe on reconnect
   - Ping/pong heartbeat mechanism (50s interval)

### Type Safety System

**Critical**: WebSocket events are 100% type-safe using `EventEmitter3` with generic typing.

- `WebSocketEventMap` (in `src/types/events.ts`) defines all event signatures
- Event names are compile-time validated
- Callback parameters are automatically typed based on event name
- No manual type annotations needed in event handlers

Example of how it works:
```typescript
// WebSocketEventMap defines:
type WebSocketEventMap = {
  prices: (data: PriceData[]) => void;
  orderbook: (data: Orderbook) => void;
  // ...
};

// WebSocketClient extends:
class WebSocketClient extends EventEmitter<WebSocketEventMap>

// Result: Full type safety
ws.on('prices', (data) => {
  // 'data' is automatically PriceData[], no annotation needed
});
```

### Request Signing Flow

All POST requests require Solana keypair signatures following Pacifica's protocol:

1. **Signer class** (`src/utils/signer.ts`) handles signature generation:
   - Takes operation type and data
   - Recursively sorts all JSON keys alphabetically
   - Creates compact JSON (no whitespace)
   - Signs UTF-8 bytes with Solana keypair
   - Returns Base58-encoded signature

2. **Signature format**:
   ```typescript
   {
     timestamp: number,           // Current time in ms
     expiry_window: number,       // Default 30000ms
     type: string,                // Operation type (e.g., 'create_order')
     data: { /* operation data */ }
   }
   ```

3. **Request format**:
   ```typescript
   {
     account: string,             // Public key
     signature: string,           // Base58 signature
     timestamp: number,
     expiry_window: number,
     ...operationData             // Original fields flattened
   }
   ```

### WebSocket Reconnection

The WebSocketClient implements robust reconnection logic:

- **Exponential backoff**: Starts at 1s, doubles each attempt, max 30s
- **Unlimited retry attempts**: Will keep trying forever (can be changed via MAX_RECONNECT_ATTEMPTS)
- **State management**: Tracks `isConnecting`, `shouldReconnect`, `manualDisconnect`
- **Subscription persistence**: Stores subscriptions in a Set, resubscribes on reconnect
- **Heartbeat**: 50s ping interval, connection closes after 60s of inactivity per API

## Module Structure

### Types (`src/types/`)
- **common.ts**: Shared domain types (Position, Order, Trade, MarketInfo, etc.)
- **api.ts**: REST API request/response types, all suffixed with "Request" or "Response"
- **events.ts**: WebSocket event types, defines WebSocketEventMap
- **errors.ts**: Custom error classes with HTTP status code mapping

### Utils (`src/utils/`)
- **signer.ts**: Solana keypair signing, recursive JSON sorting, Base58 encoding
- **errors.ts**: Error handling utilities, converts HTTP status codes to typed errors

## Adding New Features

### Adding a REST API Endpoint

1. Define request/response types in `src/types/api.ts`
2. Add method to `ApiClient` class in `src/client/ApiClient.ts`
3. Use `this.get()` for GET requests, `this.post()` for POST (auto-signs)
4. Add JSDoc documentation with `@param`, `@returns`, `@throws`, and `@example`

### Adding a WebSocket Event

1. Add event to `WebSocketEventMap` in `src/types/events.ts`:
   ```typescript
   export type WebSocketEventMap = {
     new_event: (data: NewEventData) => void;
     // ...
   };
   ```

2. Add handler in `WebSocketClient.handleMessage()` to emit the event

3. Optionally add convenience subscription method:
   ```typescript
   subscribeNewEvent(params: string): void {
     this.subscribe({ source: 'new_event', params });
   }
   ```

### Adding New Types

- Domain types go in `src/types/common.ts`
- API types go in `src/types/api.ts`
- Event types go in `src/types/events.ts`
- Always export from `src/types/index.ts`

## Important Implementation Details

### Error Handling
- All API errors are converted to typed error classes via `handleHttpError()`
- Business logic errors (422) include error codes mapped to human-readable messages
- WebSocket errors are emitted as 'error' events, not thrown

### String-Based Numbers
All numeric values in the API (prices, amounts, balances) are **strings**, not numbers. This prevents floating-point precision issues in financial calculations.

### Bundle Output
The build produces three outputs via tsup:
- `dist/index.js` - CommonJS bundle
- `dist/index.mjs` - ES Module bundle
- `dist/index.d.ts` - TypeScript declarations

### Documentation Standards
- Every public method must have JSDoc with description, @param, @returns, @example
- Use markdown formatting in descriptions
- Include @throws for methods that can error
- Mark authentication requirements with "**Requires authentication**"

## Testing Strategy

When testing:
- Use testnet endpoints with `testnet: true`
- Examples in `examples/` directory serve as integration tests
- Test WebSocket reconnection by forcing disconnects
- Test error handling with invalid requests

## Common Pitfalls

1. **Don't use numbers for financial values** - Always use strings
2. **WebSocket subscriptions before connect** - They're stored and sent on connect
3. **POST without private key** - Will throw "Private key required" error
4. **Recursive key sorting** - Must sort at ALL levels, not just top level
5. **EventEmitter typing** - Must use generic parameter, not inheritance
