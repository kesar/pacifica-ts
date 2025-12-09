import { EventEmitter } from 'eventemitter3';
import WebSocket from 'isomorphic-ws';
import type {
  ClientConfig,
  ExtractEventData,
  PacificaWebSocketEvent,
  SubscriptionParams,
  WebSocketEventMap,
  WebSocketTradingOperation,
} from '../types/index.js';
import { WebSocketError } from '../types/index.js';
import { Signer } from '../utils/signer.js';

const MAINNET_WS_URL = 'wss://ws.pacifica.fi/ws';
const TESTNET_WS_URL = 'wss://test-ws.pacifica.fi/ws';
const PING_INTERVAL = 50000;
const RECONNECT_BASE_DELAY = 1000;
const RECONNECT_MAX_DELAY = 30000;
const MAX_RECONNECT_ATTEMPTS = Infinity;

/**
 * WebSocket client for real-time streaming data from Pacifica.
 *
 * Features:
 * - **Type-safe events** - All event names and callbacks are fully typed
 * - **Automatic reconnection** - Exponential backoff with unlimited retry attempts
 * - **Automatic resubscription** - Resubscribes to all channels after reconnect
 * - **Heartbeat monitoring** - Keeps connection alive with ping/pong messages
 *
 * @example
 * ```typescript
 * const ws = new WebSocketClient({ testnet: true });
 *
 * // Type-safe event listeners
 * ws.on('prices', (data) => {
 *   // 'data' is automatically typed as PriceData[]
 *   console.log(data);
 * });
 *
 * ws.on('open', () => {
 *   ws.subscribePrices();
 *   ws.subscribeOrderbook('BTC');
 * });
 *
 * ws.connect();
 * ```
 */
export class WebSocketClient extends EventEmitter<WebSocketEventMap> {
  private url: string;
  private ws: WebSocket | null = null;
  private signer?: Signer;
  private pingInterval: NodeJS.Timeout | null = null;
  private reconnectAttempts = 0;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private shouldReconnect = true;
  private isConnecting = false;
  private subscriptions: Set<string> = new Set();
  private manualDisconnect = false;

  /**
   * Creates a new WebSocketClient instance.
   *
   * @param config - Configuration options
   * @param config.wsUrl - Custom WebSocket URL (optional)
   * @param config.privateKey - Base58-encoded Solana private key (required for trading operations)
   * @param config.testnet - Use testnet endpoints (default: false)
   */
  constructor(config: ClientConfig) {
    super();
    this.url = config.wsUrl || (config.testnet ? TESTNET_WS_URL : MAINNET_WS_URL);

    if (config.privateKey) {
      this.signer = new Signer(config.privateKey);
    }
  }

  /**
   * Establishes WebSocket connection.
   *
   * - Automatically reconnects on disconnect with exponential backoff
   * - Starts heartbeat/ping mechanism to keep connection alive
   * - Resubscribes to all previous subscriptions after reconnect
   *
   * Emits 'open' event when connection is established.
   *
   * @example
   * ```typescript
   * ws.on('open', () => {
   *   console.log('Connected!');
   * });
   * ws.connect();
   * ```
   */
  connect(): void {
    if (this.ws?.readyState === WebSocket.OPEN || this.isConnecting) {
      return;
    }

    this.isConnecting = true;
    this.manualDisconnect = false;

    try {
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        this.isConnecting = false;
        this.reconnectAttempts = 0;
        this.emit('open');
        this.startPingInterval();
        this.resubscribeAll();
      };

      this.ws.onclose = (event) => {
        this.isConnecting = false;
        this.stopPingInterval();
        this.emit('close', event.code, event.reason);

        if (this.shouldReconnect && !this.manualDisconnect) {
          this.scheduleReconnect();
        }
      };

      this.ws.onerror = () => {
        this.isConnecting = false;
        const err = new WebSocketError('WebSocket error occurred');
        this.emit('error', err);
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data.toString()) as PacificaWebSocketEvent;
          this.handleMessage(data);
        } catch (_error) {
          this.emit('error', new WebSocketError('Failed to parse WebSocket message'));
        }
      };
    } catch (error) {
      this.isConnecting = false;
      this.emit('error', new WebSocketError(`Failed to connect: ${error}`));
    }
  }

  disconnect(): void {
    this.shouldReconnect = false;
    this.manualDisconnect = true;
    this.stopPingInterval();
    this.clearReconnectTimeout();

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  subscribe(params: SubscriptionParams): void {
    const subscriptionKey = JSON.stringify(params);
    this.subscriptions.add(subscriptionKey);

    if (this.isConnected()) {
      this.sendMessage({ method: 'subscribe', params });
    }
  }

  unsubscribe(params: SubscriptionParams): void {
    const subscriptionKey = JSON.stringify(params);
    this.subscriptions.delete(subscriptionKey);

    if (this.isConnected()) {
      this.sendMessage({ method: 'unsubscribe', params });
    }
  }

  /**
   * Subscribes to real-time prices for all symbols.
   *
   * Emits 'prices' events with current mark prices, funding rates, and volumes.
   *
   * @example
   * ```typescript
   * ws.subscribePrices();
   * ws.on('prices', (data) => {
   *   data.forEach(price => {
   *     console.log(`${price.symbol}: $${price.mark}`);
   *   });
   * });
   * ```
   */
  subscribePrices(): void {
    this.subscribe({ source: 'prices' });
  }

  /**
   * Subscribes to orderbook updates for a specific symbol.
   *
   * Emits 'orderbook' events with bid/ask levels.
   *
   * @param symbol - Trading symbol (e.g., 'BTC', 'ETH')
   *
   * @example
   * ```typescript
   * ws.subscribeOrderbook('BTC');
   * ws.on('orderbook', (data) => {
   *   console.log('Best bid:', data.bids[0]);
   *   console.log('Best ask:', data.asks[0]);
   * });
   * ```
   */
  subscribeOrderbook(symbol: string): void {
    this.subscribe({ source: 'orderbook', symbol });
  }

  /**
   * Subscribes to Best Bid/Offer (BBO) updates for a specific symbol.
   *
   * More lightweight than full orderbook subscription.
   *
   * @param symbol - Trading symbol (e.g., 'BTC', 'ETH')
   *
   * @example
   * ```typescript
   * ws.subscribeBBO('BTC');
   * ws.on('bbo', (data) => {
   *   console.log(`Spread: ${data.best_ask - data.best_bid}`);
   * });
   * ```
   */
  subscribeBBO(symbol: string): void {
    this.subscribe({ source: 'bbo', symbol });
  }

  /**
   * Subscribes to real-time trades for a specific symbol.
   *
   * @param symbol - Trading symbol (e.g., 'BTC', 'ETH')
   *
   * @example
   * ```typescript
   * ws.subscribeTrades('ETH');
   * ws.on('trades', (trades) => {
   *   trades.forEach(trade => {
   *     console.log(`${trade.side} ${trade.amount} @ $${trade.price}`);
   *   });
   * });
   * ```
   */
  subscribeTrades(symbol: string): void {
    this.subscribe({ source: 'trades', symbol });
  }

  /**
   * Subscribes to candlestick (OHLCV) data for a specific symbol and interval.
   *
   * @param symbol - Trading symbol (e.g., 'BTC', 'ETH')
   * @param interval - Candle interval ('1m', '3m', '5m', '15m', '30m', '1h', '2h', '4h', '8h', '12h', '1d')
   *
   * @example
   * ```typescript
   * ws.subscribeCandle('BTC', '1h');
   * ws.on('candle', (candle) => {
   *   console.log(`OHLC: ${candle.open}/${candle.high}/${candle.low}/${candle.close}`);
   * });
   * ```
   */
  subscribeCandle(symbol: string, interval: string): void {
    this.subscribe({ source: 'candle', symbol, interval });
  }

  /**
   * Subscribes to mark price candlestick data for a specific symbol and interval.
   *
   * @param symbol - Trading symbol (e.g., 'BTC', 'ETH')
   * @param interval - Candle interval ('1m', '3m', '5m', '15m', '30m', '1h', '2h', '4h', '8h', '12h', '1d')
   */
  subscribeMarkPriceCandle(symbol: string, interval: string): void {
    this.subscribe({ source: 'mark_price_candle', symbol, interval });
  }

  /**
   * Subscribes to account margin updates.
   *
   * @param account - Wallet address to monitor
   *
   * @example
   * ```typescript
   * ws.subscribeAccountMargin('your-wallet-address');
   * ws.on('account_margin', (data) => {
   *   console.log('Margin used:', data.total_margin_used);
   *   console.log('Available:', data.available_to_spend);
   * });
   * ```
   */
  subscribeAccountMargin(account: string): void {
    this.subscribe({ source: 'account_margin', account });
  }

  /**
   * Subscribes to account leverage updates.
   *
   * @param account - Wallet address to monitor
   */
  subscribeAccountLeverage(account: string): void {
    this.subscribe({ source: 'account_leverage', account });
  }

  /**
   * Subscribes to account information updates (balance, equity, etc.).
   *
   * @param account - Wallet address to monitor
   *
   * @example
   * ```typescript
   * ws.subscribeAccountInfo('your-wallet-address');
   * ws.on('account_info', (info) => {
   *   console.log('Balance:', info.balance);
   *   console.log('Equity:', info.account_equity);
   * });
   * ```
   */
  subscribeAccountInfo(account: string): void {
    this.subscribe({ source: 'account_info', account });
  }

  /**
   * Subscribes to real-time position updates for an account.
   *
   * @param account - Wallet address to monitor
   *
   * @example
   * ```typescript
   * ws.subscribeAccountPositions('your-wallet-address');
   * ws.on('account_positions', (positions) => {
   *   positions.forEach(pos => {
   *     console.log(`${pos.symbol}: PnL ${pos.unrealized_pnl}`);
   *   });
   * });
   * ```
   */
  subscribeAccountPositions(account: string): void {
    this.subscribe({ source: 'account_positions', account });
  }

  /**
   * Subscribes to open orders for an account.
   *
   * @param account - Wallet address to monitor
   */
  subscribeAccountOrders(account: string): void {
    this.subscribe({ source: 'account_orders', account });
  }

  /**
   * Subscribes to order status updates (created, filled, cancelled, etc.).
   *
   * **Most useful for tracking order lifecycle in real-time.**
   *
   * @param account - Wallet address to monitor
   *
   * @example
   * ```typescript
   * ws.subscribeAccountOrderUpdates('your-wallet-address');
   * ws.on('account_order_updates', (update) => {
   *   console.log(`Order ${update.order.order_id}: ${update.update_type}`);
   * });
   * ```
   */
  subscribeAccountOrderUpdates(account: string): void {
    this.subscribe({ source: 'account_order_updates', account });
  }

  /**
   * Subscribes to real-time trade execution updates for an account.
   *
   * @param account - Wallet address to monitor
   *
   * @example
   * ```typescript
   * ws.subscribeAccountTrades('your-wallet-address');
   * ws.on('account_trades', (trades) => {
   *   trades.forEach(trade => {
   *     console.log(`Filled: ${trade.amount} @ $${trade.price}`);
   *   });
   * });
   * ```
   */
  subscribeAccountTrades(account: string): void {
    this.subscribe({ source: 'account_trades', account });
  }

  /**
   * Sends a trading operation via WebSocket.
   *
   * **Requires authentication** - privateKey must be configured.
   *
   * The operation data will be automatically signed and wrapped in the correct WebSocket message format:
   * ```json
   * {
   *   "id": "request-uuid",
   *   "params": {
   *     "operation_type": {
   *       "account": "...",
   *       "signature": "...",
   *       "timestamp": 123,
   *       ...operationData
   *     }
   *   }
   * }
   * ```
   *
   * @param operation - Trading operation with id, type, and data
   * @throws {Error} If private key is not configured
   * @throws {WebSocketError} If WebSocket is not connected
   *
   * @example
   * ```typescript
   * ws.sendTradingOperation({
   *   id: crypto.randomUUID(),
   *   type: 'cancel_order',
   *   data: {
   *     symbol: 'BTC',
   *     order_id: 12345
   *   }
   * });
   * ```
   */
  sendTradingOperation(operation: WebSocketTradingOperation): void {
    if (!this.signer) {
      throw new Error('Private key required for trading operations');
    }

    // Sign the operation data
    const signedData = this.signer.signRequest(operation.type, operation.data);

    // Wrap in WebSocket message format
    const message = {
      id: operation.id,
      params: {
        [operation.type]: signedData,
      },
    };

    this.sendMessage(message);
  }

  private sendMessage(message: unknown): void {
    if (!this.isConnected()) {
      throw new WebSocketError('WebSocket is not connected');
    }

    if (!this.ws) {
      throw new WebSocketError('WebSocket instance is null');
    }

    try {
      this.ws.send(JSON.stringify(message));
    } catch (error) {
      throw new WebSocketError(`Failed to send message: ${error}`);
    }
  }

  private handleMessage(event: PacificaWebSocketEvent): void {
    const { channel, data } = event as { channel: string; data: unknown };

    switch (channel) {
      case 'pong':
        this.emit('pong');
        break;
      case 'prices':
        this.emit('prices', data as ExtractEventData<'prices'>);
        break;
      case 'orderbook':
        this.emit('orderbook', data as ExtractEventData<'orderbook'>);
        break;
      case 'bbo':
        this.emit('bbo', data as ExtractEventData<'bbo'>);
        break;
      case 'trades':
        this.emit('trades', this.transformTrades(data as unknown[]));
        break;
      case 'candle':
        this.emit('candle', this.transformCandle(data as Record<string, unknown>));
        break;
      case 'mark_price_candle':
        this.emit('mark_price_candle', this.transformCandle(data as Record<string, unknown>));
        break;
      case 'account_margin':
        this.emit('account_margin', data as ExtractEventData<'account_margin'>);
        break;
      case 'account_leverage':
        this.emit('account_leverage', data as ExtractEventData<'account_leverage'>);
        break;
      case 'account_info':
        this.emit('account_info', this.transformAccountInfo(data as Record<string, unknown>));
        break;
      case 'account_positions':
        this.emit('account_positions', this.transformPositions(data as unknown[]));
        break;
      case 'account_orders':
        this.emit('account_orders', this.transformOrders(data as unknown[]));
        break;
      case 'account_order_updates':
        this.emit('account_order_updates', this.transformOrderUpdates(data as unknown[]));
        break;
      case 'account_trades':
        this.emit('account_trades', this.transformTrades(data as unknown[]));
        break;
      case 'error':
        this.emit('ws_error', data as ExtractEventData<'ws_error'>);
        break;
      default:
        break;
    }
  }

  /**
   * Transforms abbreviated candle data from WebSocket to readable field names.
   */
  private transformCandle(data: Record<string, unknown>): import('../types/common.js').Candle {
    return {
      timestamp: data['t'] as number,
      end_time: data['T'] as number,
      symbol: data['s'] as string,
      interval: data['i'] as string,
      open: data['o'] as string,
      close: data['c'] as string,
      high: data['h'] as string,
      low: data['l'] as string,
      volume: data['v'] as string,
      number_of_trades: data['n'] as number,
    };
  }

  /**
   * Transforms abbreviated account info data from WebSocket to readable field names.
   */
  private transformAccountInfo(data: Record<string, unknown>): import('../types/common.js').AccountInfo {
    return {
      balance: data['b'] as string,
      fee_level: data['f'] as number,
      account_equity: data['ae'] as string,
      available_to_spend: data['as'] as string,
      available_to_withdraw: data['aw'] as string,
      pending_balance: data['pb'] as string,
      total_margin_used: data['mu'] as string,
      cross_mmr: data['cm'] as string,
      positions_count: data['pc'] as number,
      orders_count: data['oc'] as number,
      stop_orders_count: data['sc'] as number,
      updated_at: data['t'] as number,
      use_ltp_for_stop_orders: false, // Not provided in WebSocket response
    };
  }

  /**
   * Transforms abbreviated position data from WebSocket to readable field names.
   */
  private transformPositions(data: unknown[]): import('../types/common.js').Position[] {
    return (data as Array<Record<string, unknown>>).map((pos) => ({
      symbol: pos['s'] as string,
      side: pos['d'] as 'bid' | 'ask',
      amount: pos['a'] as string,
      entry_price: pos['p'] as string,
      margin: pos['m'] !== undefined && pos['m'] !== null ? (pos['m'] as string) : undefined,
      funding: pos['f'] as string,
      isolated: pos['i'] as boolean,
      created_at: pos['t'] as number, // WebSocket only provides timestamp, use for both
      updated_at: pos['t'] as number,
    }));
  }

  /**
   * Transforms abbreviated order data from WebSocket to readable field names.
   */
  private transformOrders(data: unknown[]): import('../types/common.js').Order[] {
    return (data as Array<Record<string, unknown>>).map((order) => ({
      order_id: order['i'] as number,
      client_order_id: order['I'] !== undefined && order['I'] !== null ? (order['I'] as string) : undefined,
      symbol: order['s'] as string,
      side: order['d'] as 'bid' | 'ask',
      price: (order['p'] || order['ip']) as string, // Use average filled price or initial price
      initial_amount: order['a'] as string,
      filled_amount: order['f'] as string,
      cancelled_amount: order['c'] as string,
      stop_price: order['sp'] !== undefined && order['sp'] !== null ? (order['sp'] as string) : null,
      order_type: order['ot'] as string,
      stop_parent_order_id: null, // Not provided in WebSocket response
      reduce_only: order['ro'] as boolean,
      created_at: order['t'] as number, // WebSocket only provides timestamp
      updated_at: order['t'] as number,
    }));
  }

  /**
   * Transforms abbreviated trade data from WebSocket to readable field names.
   */
  private transformTrades(data: unknown[]): import('../types/common.js').Trade[] {
    return (data as Array<Record<string, unknown>>).map((trade) => ({
      history_id: trade['h'] as number,
      order_id: trade['i'] as number,
      client_order_id: trade['I'] !== undefined && trade['I'] !== null ? (trade['I'] as string) : undefined,
      symbol: trade['s'] as string,
      amount: trade['a'] as string,
      price: trade['p'] as string,
      entry_price: trade['o'] as string,
      fee: trade['f'] as string,
      pnl: trade['n'] as string,
      event_type: trade['te'] as string,
      side: trade['ts'] as string,
      created_at: trade['t'] as number,
      cause: trade['tc'] as string,
    }));
  }

  /**
   * Transforms abbreviated order update data from WebSocket to readable field names.
   * The WebSocket sends an array of order objects, and we derive update_type from order event (oe) and status (os).
   */
  private transformOrderUpdates(data: unknown[]): Array<{
    order: import('../types/common.js').Order;
    update_type: 'created' | 'filled' | 'partially_filled' | 'cancelled' | 'expired';
  }> {
    return (data as Array<Record<string, unknown>>).map((orderData) => {
      const order = this.transformOrderUpdateOrder(orderData);
      // Map order event (oe) and status (os) to update_type
      const orderEvent = orderData['oe'] as string;
      const orderStatus = orderData['os'] as string;
      let update_type: 'created' | 'filled' | 'partially_filled' | 'cancelled' | 'expired';
      
      if (orderStatus === 'filled') {
        update_type = 'filled';
      } else if (orderStatus === 'partially_filled') {
        update_type = 'partially_filled';
      } else if (orderEvent === 'cancel' || orderEvent === 'force_cancel' || orderStatus === 'cancelled') {
        update_type = 'cancelled';
      } else if (orderEvent === 'expired' || orderStatus === 'rejected') {
        update_type = 'expired';
      } else {
        // Default to created for new orders (make, stop_created, etc.)
        update_type = 'created';
      }

      return { order, update_type };
    });
  }

  /**
   * Transforms a single order update object from WebSocket to readable field names.
   */
  private transformOrderUpdateOrder(orderData: Record<string, unknown>): import('../types/common.js').Order {
    return {
      order_id: orderData['i'] as number,
      client_order_id: orderData['I'] !== undefined && orderData['I'] !== null ? (orderData['I'] as string) : undefined,
      symbol: orderData['s'] as string,
      side: orderData['d'] as 'bid' | 'ask',
      price: (orderData['p'] || orderData['ip']) as string,
      initial_amount: orderData['a'] as string,
      filled_amount: orderData['f'] as string,
      cancelled_amount: '0', // Not provided in order updates
      stop_price: orderData['sp'] !== undefined && orderData['sp'] !== null ? (orderData['sp'] as string) : null,
      order_type: orderData['ot'] as string,
      stop_parent_order_id: orderData['si'] !== undefined && orderData['si'] !== null ? (Number(orderData['si']) as number) : null,
      reduce_only: orderData['r'] as boolean,
      created_at: orderData['ct'] as number,
      updated_at: orderData['ut'] as number,
    };
  }

  private startPingInterval(): void {
    this.stopPingInterval();

    this.pingInterval = setInterval(() => {
      if (this.isConnected()) {
        try {
          this.sendMessage({ method: 'ping' });
        } catch (_error) {
          // Ignore ping errors - connection will be handled by onclose/onerror handlers
        }
      }
    }, PING_INTERVAL);
  }

  private stopPingInterval(): void {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }

  private scheduleReconnect(): void {
    if (this.reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
      this.emit('error', new WebSocketError('Max reconnection attempts reached'));
      return;
    }

    this.clearReconnectTimeout();

    const delay = Math.min(RECONNECT_BASE_DELAY * 2 ** this.reconnectAttempts, RECONNECT_MAX_DELAY);

    this.reconnectTimeout = setTimeout(() => {
      this.reconnectAttempts++;
      this.connect();
    }, delay);
  }

  private clearReconnectTimeout(): void {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
  }

  private resubscribeAll(): void {
    for (const subscriptionKey of this.subscriptions) {
      try {
        const params = JSON.parse(subscriptionKey) as SubscriptionParams;
        this.sendMessage({ method: 'subscribe', params });
      } catch (_error) {
        // Ignore resubscription errors - individual subscription failures shouldn't stop others
      }
    }
  }
}
