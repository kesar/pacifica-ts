# pacifica.js

[![CI](https://github.com/pacifica/typescript-sdk/actions/workflows/ci.yml/badge.svg)](https://github.com/pacifica/typescript-sdk/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/pacifica.js.svg)](https://www.npmjs.com/package/pacifica.js)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/pacifica.js)](https://nodejs.org/)

A comprehensive TypeScript library for interacting with the Pacifica API and WebSocket services. Built with type safety, robust error handling, and automatic reconnection management.

## Features

- **Full TypeScript support** with comprehensive type definitions
- **100% Type-Safe WebSocket Events** - Event names and callback parameters are fully typed
- Modular architecture with separate REST API and WebSocket clients
- Automatic WebSocket reconnection with exponential backoff
- Built-in request signing using Solana keypairs
- Event-driven WebSocket subscriptions with EventEmitter3
- Comprehensive error handling

## Installation

```bash
npm install pacifica.js
```

## Quick Start

### Basic Usage

```typescript
import { PacificaClient } from 'pacifica.js';

const client = new PacificaClient({
  privateKey: 'your-solana-private-key-base58',
  testnet: true
});

const marketInfo = await client.api.getMarketInfo();
console.log('Markets:', marketInfo);
```

### Configuration

```typescript
interface ClientConfig {
  apiUrl?: string;
  wsUrl?: string;
  privateKey?: string;
  testnet?: boolean;
}
```

- `apiUrl` - Custom REST API URL (defaults to mainnet/testnet based on `testnet` flag)
- `wsUrl` - Custom WebSocket URL (defaults to mainnet/testnet based on `testnet` flag)
- `privateKey` - Base58-encoded Solana private key (required for authenticated requests)
- `testnet` - Set to `true` to use testnet endpoints (default: `false`)

## REST API Usage

### Market Data

```typescript
const prices = await client.api.getPrices();

const orderbook = await client.api.getOrderbook({
  symbol: 'BTC',
  depth: 20
});

const candles = await client.api.getCandleData({
  symbol: 'ETH',
  interval: '1h',
  limit: 100
});

const trades = await client.api.getRecentTrades({
  symbol: 'BTC',
  limit: 50
});
```

### Account Information

```typescript
const accountInfo = await client.api.getAccountInfo('your-wallet-address');
console.log('Balance:', accountInfo.balance);
console.log('Available to withdraw:', accountInfo.available_to_withdraw);

const positions = await client.api.getPositions('your-wallet-address', 'BTC');

const openOrders = await client.api.getOpenOrders('your-wallet-address');
```

### Trading Operations

All trading operations require a private key to be configured.

#### Creating Orders

```typescript
const limitOrder = await client.api.createLimitOrder({
  symbol: 'BTC',
  price: '50000',
  amount: '0.1',
  side: 'bid',
  tif: 'GTC',
  reduce_only: false,
  client_order_id: crypto.randomUUID()
});

const marketOrder = await client.api.createMarketOrder({
  symbol: 'ETH',
  amount: '1.0',
  side: 'ask',
  reduce_only: false
});

const stopOrder = await client.api.createStopOrder({
  symbol: 'BTC',
  stop_price: '45000',
  limit_price: '44900',
  amount: '0.1',
  side: 'ask',
  tif: 'GTC',
  reduce_only: false
});
```

#### Managing Orders

```typescript
const edited = await client.api.editOrder({
  order_id: 12345,
  price: '51000',
  amount: '0.2'
});

const cancelled = await client.api.cancelOrder({
  order_id: 12345
});

const cancelledAll = await client.api.cancelAllOrders({
  symbol: 'BTC'
});
```

#### Batch Orders

```typescript
const batchResult = await client.api.batchOrder({
  orders: [
    {
      type: 'create',
      order: {
        symbol: 'BTC',
        price: '50000',
        amount: '0.1',
        side: 'bid',
        tif: 'GTC',
        reduce_only: false
      }
    },
    {
      type: 'cancel',
      cancel: {
        order_id: 12345
      }
    }
  ]
});
```

### Position Management

```typescript
await client.api.updateLeverage({
  symbol: 'BTC',
  leverage: 10,
  margin_mode: 'cross'
});

await client.api.updateMarginMode({
  symbol: 'ETH',
  margin_mode: 'isolated'
});

await client.api.createPositionTPSL({
  symbol: 'BTC',
  take_profit: {
    stop_price: '55000',
    limit_price: '54950'
  },
  stop_loss: {
    stop_price: '48000'
  }
});
```

## WebSocket Usage

### Connecting

```typescript
client.ws.on('open', () => {
  console.log('WebSocket connected');
});

client.ws.on('close', (code, reason) => {
  console.log('WebSocket closed:', code, reason);
});

client.ws.on('error', (error) => {
  console.error('WebSocket error:', error);
});

client.connect();
```

### Market Data Subscriptions

```typescript
client.ws.subscribePrices();
client.ws.on('prices', (data) => {
  console.log('Price update:', data);
});

client.ws.subscribeOrderbook('BTC');
client.ws.on('orderbook', (data) => {
  console.log('Orderbook:', data);
});

client.ws.subscribeTrades('ETH');
client.ws.on('trades', (data) => {
  console.log('Trades:', data);
});

client.ws.subscribeCandle('BTC', '1h');
client.ws.on('candle', (data) => {
  console.log('Candle:', data);
});
```

### Account Subscriptions

```typescript
const walletAddress = 'your-wallet-address';

client.ws.subscribeAccountInfo(walletAddress);
client.ws.on('account_info', (data) => {
  console.log('Account info:', data);
});

client.ws.subscribeAccountPositions(walletAddress);
client.ws.on('account_positions', (positions) => {
  console.log('Positions:', positions);
});

client.ws.subscribeAccountOrders(walletAddress);
client.ws.on('account_orders', (orders) => {
  console.log('Open orders:', orders);
});

client.ws.subscribeAccountOrderUpdates(walletAddress);
client.ws.on('account_order_updates', (update) => {
  console.log('Order update:', update);
});

client.ws.subscribeAccountTrades(walletAddress);
client.ws.on('account_trades', (trades) => {
  console.log('Trades:', trades);
});
```

### Unsubscribing

```typescript
client.ws.unsubscribe({ source: 'prices' });

client.ws.unsubscribe({ source: 'orderbook', symbol: 'BTC' });
```

### Disconnecting

```typescript
client.disconnect();
```

### WebSocket Type Safety

The WebSocket client uses **EventEmitter3 with generic typing**, providing complete type safety:

```typescript
// ✅ TYPE SAFE: Event names are autocompleted and type-checked
client.ws.on('prices', (data) => {
  // 'data' is automatically typed as PriceData[]
  data.forEach(price => {
    console.log(price.symbol);  // ✅ Full autocomplete!
    console.log(price.mark);    // ✅ Full autocomplete!
  });
});

// ✅ TYPE SAFE: Callback parameters match event type
client.ws.on('orderbook', (orderbook) => {
  // 'orderbook' is typed as Orderbook
  console.log(orderbook.symbol);
  console.log(orderbook.bids[0]);
});

// ❌ COMPILE ERROR: Invalid event name
client.ws.on('invalid_event', (data) => {
  // TypeScript error: Argument of type '"invalid_event"' is not assignable...
});

// ❌ COMPILE ERROR: Wrong callback signature
client.ws.on('prices', (data: string) => {
  // TypeScript error: Types of parameters 'data' and 'data' are incompatible
});
```

**Benefits:**
- Event names have autocomplete in your IDE
- Callback parameters are automatically typed - no manual type annotations needed
- TypeScript catches typos in event names at compile time
- Full IntelliSense support for event data structures

## Error Handling

The SDK provides typed error classes for different scenarios:

```typescript
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  BusinessLogicError,
  RateLimitError,
  InternalServerError,
  WebSocketError
} from 'pacifica.js';

try {
  await client.api.createLimitOrder({
  });
} catch (error) {
  if (error instanceof BusinessLogicError) {
    console.error('Business logic error:', error.message, error.code);
  } else if (error instanceof RateLimitError) {
    console.error('Rate limit exceeded');
  } else if (error instanceof BadRequestError) {
    console.error('Bad request:', error.message);
  }
}
```

## Advanced Usage

### Using Separate Clients

You can use the API and WebSocket clients independently:

```typescript
import { ApiClient, WebSocketClient } from 'pacifica.js';

const apiClient = new ApiClient({
  privateKey: 'your-private-key',
  testnet: true
});

const wsClient = new WebSocketClient({
  privateKey: 'your-private-key',
  testnet: true
});

wsClient.connect();
```

### Custom URLs

```typescript
const client = new PacificaClient({
  apiUrl: 'https://custom-api.example.com/api/v1',
  wsUrl: 'wss://custom-ws.example.com/ws',
  privateKey: 'your-private-key'
});
```

## Type Safety

All requests and responses are fully typed:

```typescript
import type {
  CreateLimitOrderRequest,
  CreateOrderResponse,
  MarketInfo,
  Position,
  Order,
  Trade,
  PriceData
} from 'pacifica.js';

const request: CreateLimitOrderRequest = {
  symbol: 'BTC',
  price: '50000',
  amount: '0.1',
  side: 'bid',
  tif: 'GTC',
  reduce_only: false
};

const response: CreateOrderResponse = await client.api.createLimitOrder(request);
```

## Examples

Check the `/examples` directory for complete usage examples:

- Basic market data fetching
- Trading bot implementation
- WebSocket subscription management
- Error handling patterns

## Development

### Setup

```bash
# Clone the repository
git clone https://github.com/pacifica/typescript-sdk.git
cd typescript-sdk

# Install dependencies
npm install

# Run in development mode (watch for changes)
npm run dev
```

### Available Scripts

```bash
# Build the library
npm run build

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Type checking
npm run typecheck

# Lint code
npm run lint

# Format and lint code (auto-fix)
npm run check:fix

# Run all checks (lint + format)
npm run check
```

### Testing

The SDK uses [Vitest](https://vitest.dev/) for testing with comprehensive unit tests covering core functionality:

- **Signer utilities**: Request signing, JSON sorting, keypair management
- **Error handling**: HTTP error mapping, error type guards
- **API client**: REST endpoints, request/response handling (planned)
- **WebSocket client**: Connection management, subscriptions (planned)

Run tests with:

```bash
# Watch mode (recommended during development)
npm test

# Single run (CI)
npm test -- --run

# With coverage report
npm run test:coverage
```

### Code Quality

We use **[Biome](https://biomejs.dev/)** for fast, consistent linting and formatting:

```bash
# Check for issues
npm run check

# Auto-fix issues
npm run check:fix

# Lint only
npm run lint

# Format only
npm run format:write
```

### Continuous Integration

All pull requests are automatically tested via GitHub Actions:

- ✅ **Linting & Formatting** - Biome checks
- ✅ **Type Checking** - TypeScript strict mode
- ✅ **Tests** - Run on Node.js 18, 20, and 22
- ✅ **Build** - Verify package builds successfully

PRs must pass all checks before merging.

## Contributing

We welcome contributions from the community! Whether you're fixing bugs, adding features, or improving documentation, your help is appreciated.

### How to Contribute

1. **Fork the repository** and create a feature branch
2. **Make your changes** following our code standards
3. **Add tests** for new features or bug fixes
4. **Ensure all checks pass**: `npm run check && npm run typecheck && npm test && npm run build`
5. **Submit a Pull Request** with a clear description

Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines on:

- Development workflow
- Code standards and style guide
- Testing requirements
- Commit message format
- Pull request process
- Architecture guidelines

### Reporting Issues

Found a bug or have a feature request? Please open an issue on GitHub with:

- Clear description of the problem
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- SDK version and environment details

## License

MIT

## Resources

- [Pacifica Documentation](https://docs.pacifica.fi)
- [Pacifica Python SDK](https://github.com/pacifica-fi/python-sdk)
- [Discord API Channel](https://discord.com/channels/1325864651816435822/1378723526957334548)
- [Contributing Guidelines](CONTRIBUTING.md)
- [GitHub Issues](https://github.com/pacifica/typescript-sdk/issues)
