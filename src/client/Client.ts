import type { ClientConfig } from '../types/index.js';
import { ApiClient } from './ApiClient.js';
import { WebSocketClient } from './WebSocketClient.js';

/**
 * Main client for interacting with Pacifica's API and WebSocket services.
 *
 * Provides a unified interface combining REST API and real-time WebSocket functionality.
 *
 * @example
 * ```typescript
 * const client = new PacificaClient({
 *   privateKey: 'your-solana-private-key',
 *   testnet: true
 * });
 *
 * // Use REST API
 * const markets = await client.api.getMarketInfo();
 * const order = await client.api.createLimitOrder({ ... });
 *
 * // Use WebSocket
 * client.ws.on('prices', (data) => console.log(data));
 * client.ws.subscribePrices();
 * client.connect();
 * ```
 */
export class PacificaClient {
  /**
   * REST API client for making HTTP requests.
   *
   * Access all market data, account information, and trading operations.
   */
  public readonly api: ApiClient;

  /**
   * WebSocket client for real-time data streaming.
   *
   * Subscribe to live prices, orderbook updates, account changes, and more.
   * All events are fully type-safe.
   */
  public readonly ws: WebSocketClient;

  private readonly config: ClientConfig;

  /**
   * Creates a new PacificaClient instance.
   *
   * @param config - Configuration options
   * @param config.apiUrl - Custom REST API URL (optional, defaults based on testnet flag)
   * @param config.wsUrl - Custom WebSocket URL (optional, defaults based on testnet flag)
   * @param config.privateKey - Base58-encoded Solana private key (required for authenticated operations)
   * @param config.testnet - Use testnet endpoints (default: false)
   *
   * @example
   * ```typescript
   * // Mainnet with authentication
   * const client = new PacificaClient({
   *   privateKey: 'your-private-key'
   * });
   *
   * // Testnet without authentication (market data only)
   * const client = new PacificaClient({
   *   testnet: true
   * });
   * ```
   */
  constructor(config: ClientConfig = {}) {
    this.config = {
      testnet: false,
      ...config,
    };

    this.api = new ApiClient(this.config);
    this.ws = new WebSocketClient(this.config);
  }

  /**
   * Establishes WebSocket connection.
   *
   * Shorthand for `client.ws.connect()`.
   *
   * @example
   * ```typescript
   * client.ws.on('open', () => {
   *   console.log('Connected!');
   * });
   * client.connect();
   * ```
   */
  connect(): void {
    this.ws.connect();
  }

  /**
   * Closes WebSocket connection.
   *
   * Shorthand for `client.ws.disconnect()`.
   *
   * @example
   * ```typescript
   * client.disconnect();
   * ```
   */
  disconnect(): void {
    this.ws.disconnect();
  }

  /**
   * Checks if WebSocket is currently connected.
   *
   * Shorthand for `client.ws.isConnected()`.
   *
   * @returns true if connected, false otherwise
   */
  isConnected(): boolean {
    return this.ws.isConnected();
  }
}
