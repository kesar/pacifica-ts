import type {
  AccountInfo,
  BatchOrderRequest,
  BatchOrderResponse,
  CancelAllOrdersRequest,
  CancelOrderRequest,
  CancelOrderResponse,
  CancelStopOrderRequest,
  Candle,
  ClientConfig,
  CreateLimitOrderRequest,
  CreateMarketOrderRequest,
  CreateOrderResponse,
  CreatePositionTPSLRequest,
  CreateStopOrderRequest,
  CreateSubaccountRequest,
  EditOrderRequest,
  GetCandleDataParams,
  GetOrderbookParams,
  GetOrderHistoryParams,
  GetRecentTradesParams,
  GetTradeHistoryParams,
  MarketInfo,
  Order,
  Orderbook,
  Position,
  PriceData,
  SubaccountFundTransferRequest,
  Trade,
  UpdateLeverageRequest,
  UpdateMarginModeRequest,
  WithdrawalRequest,
} from '../types/index.js';
import { handleHttpError, isApiErrorResponse, isApiResponse } from '../utils/errors.js';
import { Signer } from '../utils/signer.js';

const MAINNET_API_URL = 'https://api.pacifica.fi/api/v1';
const TESTNET_API_URL = 'https://test-api.pacifica.fi/api/v1';

/**
 * REST API client for interacting with Pacifica's trading platform.
 *
 * Provides methods for:
 * - Market data (prices, orderbooks, trades, candles)
 * - Account information (balance, positions, orders)
 * - Trading operations (create/edit/cancel orders)
 * - Account management (leverage, margin mode, withdrawals)
 *
 * @example
 * ```typescript
 * const client = new ApiClient({
 *   privateKey: 'your-solana-private-key',
 *   testnet: true
 * });
 *
 * const markets = await client.getMarketInfo();
 * ```
 */
export class ApiClient {
  private baseUrl: string;
  private signer?: Signer;

  /**
   * Creates a new ApiClient instance.
   *
   * @param config - Configuration options
   * @param config.apiUrl - Custom API URL (optional)
   * @param config.privateKey - Base58-encoded Solana private key (required for POST requests)
   * @param config.testnet - Use testnet endpoints (default: false)
   */
  constructor(config: ClientConfig) {
    this.baseUrl = config.apiUrl || (config.testnet ? TESTNET_API_URL : MAINNET_API_URL);

    if (config.privateKey) {
      this.signer = new Signer(config.privateKey);
    }
  }

  private async request<T>(method: 'GET' | 'POST', path: string, data?: unknown): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    const options: RequestInit = {
      method,
      headers,
    };

    if (data && method === 'POST') {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);
      const responseData = await response.json();

      if (!response.ok) {
        if (isApiErrorResponse(responseData)) {
          handleHttpError(response.status, responseData.error, responseData.code);
        }
        handleHttpError(response.status, response.statusText);
      }

      if (!isApiResponse<T>(responseData)) {
        throw new Error('Invalid API response format');
      }

      if (!responseData.success && responseData.error) {
        handleHttpError(response.status, responseData.error, responseData.code ?? undefined);
      }

      return responseData.data;
    } catch (error) {
      // Already a PacificaError or TypeError from our code
      if (error instanceof Error) {
        throw error;
      }
      // Unknown error type
      throw new Error(`Network request failed: ${String(error)}`);
    }
  }

  private async get<T>(path: string, params?: Record<string, string | number>): Promise<T> {
    let url = path;
    if (params) {
      const searchParams = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        searchParams.append(key, String(value));
      }
      url += `?${searchParams.toString()}`;
    }
    return this.request<T>('GET', url);
  }

  private async post<T>(path: string, operationType: string, data: Record<string, unknown> | object): Promise<T> {
    if (!this.signer) {
      throw new Error('Private key required for POST requests');
    }

    const signedData = this.signer.signRequest(operationType, data as Record<string, unknown>);
    return this.request<T>('POST', path, signedData);
  }

  /**
   * Retrieves information about all available trading markets.
   *
   * @returns Array of market information including tick size, lot size, leverage limits, and funding rates
   *
   * @example
   * ```typescript
   * const markets = await client.getMarketInfo();
   * markets.forEach(market => {
   *   console.log(`${market.symbol}: max leverage ${market.max_leverage}x`);
   * });
   * ```
   */
  async getMarketInfo(): Promise<MarketInfo[]> {
    return this.get<MarketInfo[]>('/info');
  }

  /**
   * Retrieves current prices for all trading symbols.
   *
   * @returns Array of price data including mark price, oracle price, funding rates, and 24h volume
   *
   * @example
   * ```typescript
   * const prices = await client.getPrices();
   * const btcPrice = prices.find(p => p.symbol === 'BTC');
   * console.log(`BTC Mark Price: $${btcPrice?.mark}`);
   * ```
   */
  async getPrices(): Promise<PriceData[]> {
    return this.get<PriceData[]>('/prices');
  }

  /**
   * Retrieves the orderbook for a specific symbol.
   *
   * @param params - Request parameters
   * @param params.symbol - Trading symbol (e.g., 'BTC', 'ETH')
   * @param params.depth - Number of price levels to return (optional)
   * @returns Orderbook with bids and asks
   *
   * @example
   * ```typescript
   * const orderbook = await client.getOrderbook({ symbol: 'BTC', depth: 20 });
   * console.log('Best bid:', orderbook.bids[0]);
   * console.log('Best ask:', orderbook.asks[0]);
   * ```
   */
  async getOrderbook(params: GetOrderbookParams): Promise<Orderbook> {
    return this.get<Orderbook>('/orderbook', {
      symbol: params.symbol,
      ...(params.depth && { depth: params.depth }),
    });
  }

  async getRecentTrades(params: GetRecentTradesParams): Promise<Trade[]> {
    return this.get<Trade[]>('/trades', {
      symbol: params.symbol,
      ...(params.limit && { limit: params.limit }),
    });
  }

  async getCandleData(params: GetCandleDataParams): Promise<Candle[]> {
    const data = await this.get<Array<Record<string, unknown>>>('/kline', {
      symbol: params.symbol,
      interval: params.interval,
      start_time: params.start_time,
      ...(params.end_time && { end_time: params.end_time }),
      ...(params.limit && { limit: params.limit }),
    });
    return data.map((candle) => this.transformCandle(candle));
  }

  async getKlineCandleData(params: GetCandleDataParams): Promise<Candle[]> {
    const data = await this.get<Array<Record<string, unknown>>>('/kline', {
      symbol: params.symbol,
      interval: params.interval,
      start_time: params.start_time,
      ...(params.end_time && { end_time: params.end_time }),
      ...(params.limit && { limit: params.limit }),
    });
    return data.map((candle) => this.transformCandle(candle));
  }

  async getMarkPriceCandleData(params: GetCandleDataParams): Promise<Candle[]> {
    const data = await this.get<Array<Record<string, unknown>>>('/kline/mark', {
      symbol: params.symbol,
      interval: params.interval,
      start_time: params.start_time,
      ...(params.end_time && { end_time: params.end_time }),
      ...(params.limit && { limit: params.limit }),
    });
    return data.map((candle) => this.transformCandle(candle));
  }

  /**
   * Transforms abbreviated candle data from API to readable field names.
   */
  private transformCandle(data: Record<string, unknown>): Candle {
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

  async getHistoricalFunding(
    symbol: string,
    limit?: number
  ): Promise<Array<{ funding_rate: string; timestamp: number }>> {
    return this.get<Array<{ funding_rate: string; timestamp: number }>>('/funding-history', {
      symbol,
      ...(limit && { limit }),
    });
  }

  async getAccountInfo(account: string): Promise<AccountInfo> {
    return this.get<AccountInfo>('/account', { account });
  }

  async getAccountSettings(account: string): Promise<{ use_ltp_for_stop_orders: boolean }> {
    return this.get<{ use_ltp_for_stop_orders: boolean }>('/account/settings', { account });
  }

  async getPositions(account: string, symbol?: string): Promise<Position[]> {
    return this.get<Position[]>('/positions', {
      account,
      ...(symbol && { symbol }),
    });
  }

  async getOpenOrders(account: string, symbol?: string): Promise<Order[]> {
    return this.get<Order[]>('/orders', {
      account,
      ...(symbol && { symbol }),
    });
  }

  async getOrderHistory(account: string, params?: GetOrderHistoryParams): Promise<Order[]> {
    return this.get<Order[]>('/orders/history', {
      account,
      ...(params?.symbol && { symbol: params.symbol }),
      ...(params?.limit && { limit: params.limit }),
      ...(params?.offset && { offset: params.offset }),
      ...(params?.start_time && { start_time: params.start_time }),
      ...(params?.end_time && { end_time: params.end_time }),
    });
  }

  async getOrderHistoryById(orderId: number): Promise<Order> {
    return this.get<Order>(`/orders/${orderId}`);
  }

  async getTradeHistory(account: string, params?: GetTradeHistoryParams): Promise<Trade[]> {
    return this.get<Trade[]>('/trades/history', {
      account,
      ...(params?.symbol && { symbol: params.symbol }),
      ...(params?.limit && { limit: params.limit }),
      ...(params?.offset && { offset: params.offset }),
      ...(params?.start_time && { start_time: params.start_time }),
      ...(params?.end_time && { end_time: params.end_time }),
    });
  }

  async getFundingHistory(
    account: string,
    symbol?: string,
    limit?: number
  ): Promise<Array<{ symbol: string; funding_payment: string; timestamp: number }>> {
    return this.get<Array<{ symbol: string; funding_payment: string; timestamp: number }>>('/funding-payments', {
      account,
      ...(symbol && { symbol }),
      ...(limit && { limit }),
    });
  }

  async getAccountBalanceHistory(
    account: string,
    limit?: number
  ): Promise<Array<{ balance: string; timestamp: number }>> {
    return this.get<Array<{ balance: string; timestamp: number }>>('/account/balance-history', {
      account,
      ...(limit && { limit }),
    });
  }

  async getAccountEquityHistory(
    account: string,
    limit?: number
  ): Promise<Array<{ equity: string; timestamp: number }>> {
    return this.get<Array<{ equity: string; timestamp: number }>>('/account/equity-history', {
      account,
      ...(limit && { limit }),
    });
  }

  /**
   * Creates a limit order.
   *
   * **Requires authentication** - privateKey must be configured.
   *
   * @param request - Limit order parameters
   * @returns Order response with order_id
   * @throws {BusinessLogicError} If insufficient balance or invalid parameters
   * @throws {RateLimitError} If rate limit is exceeded
   *
   * @example
   * ```typescript
   * const order = await client.createLimitOrder({
   *   symbol: 'BTC',
   *   price: '50000',
   *   amount: '0.1',
   *   side: 'bid',
   *   tif: 'GTC',
   *   reduce_only: false,
   *   client_order_id: crypto.randomUUID(),
   *   take_profit: { stop_price: '55000' },
   *   stop_loss: { stop_price: '48000' }
   * });
   * console.log('Order created:', order.order_id);
   * ```
   */
  async createLimitOrder(request: CreateLimitOrderRequest): Promise<CreateOrderResponse> {
    return this.post<CreateOrderResponse>('/orders/create', 'create_order', request);
  }

  /**
   * Creates a market order that executes immediately at the best available price.
   *
   * **Requires authentication** - privateKey must be configured.
   *
   * @param request - Market order parameters
   * @returns Order response with order_id
   * @throws {BusinessLogicError} If insufficient balance or insufficient liquidity
   *
   * @example
   * ```typescript
   * const order = await client.createMarketOrder({
   *   symbol: 'ETH',
   *   amount: '1.0',
   *   side: 'bid',
   *   reduce_only: false,
   *   slippage_percent: '0.5'
   * });
   * ```
   */
  async createMarketOrder(request: CreateMarketOrderRequest): Promise<CreateOrderResponse> {
    return this.post<CreateOrderResponse>('/orders/create_market', 'create_market_order', request);
  }

  /**
   * Creates a stop order that triggers when the price reaches the stop price.
   *
   * **Requires authentication** - privateKey must be configured.
   *
   * @param request - Stop order parameters
   * @returns Order response with order_id
   *
   * @example
   * ```typescript
   * const stopOrder = await client.createStopOrder({
   *   symbol: 'BTC',
   *   side: 'ask',
   *   reduce_only: false,
   *   stop_order: {
   *     stop_price: '45000',
   *     limit_price: '44900',
   *     amount: '0.1'
   *   }
   * });
   * ```
   */
  async createStopOrder(request: CreateStopOrderRequest): Promise<CreateOrderResponse> {
    return this.post<CreateOrderResponse>('/orders/stop/create', 'create_stop_order', request);
  }

  /**
   * Edits an existing order's price or amount.
   *
   * **Requires authentication** - privateKey must be configured.
   *
   * @param request - Edit order parameters
   * @returns Updated order_id
   * @throws {BusinessLogicError} If order not found
   *
   * @example
   * ```typescript
   * await client.editOrder({
   *   order_id: 12345,
   *   price: '51000',
   *   amount: '0.2'
   * });
   * ```
   */
  async editOrder(request: EditOrderRequest): Promise<{ order_id: number }> {
    return this.post<{ order_id: number }>('/orders/edit', 'edit_order', request);
  }

  /**
   * Cancels an existing order.
   *
   * **Requires authentication** - privateKey must be configured.
   *
   * @param request - Cancel order parameters
   * @returns Cancellation confirmation
   * @throws {BusinessLogicError} If order not found or already filled
   *
   * @example
   * ```typescript
   * await client.cancelOrder({ order_id: 12345 });
   * ```
   */
  async cancelOrder(request: CancelOrderRequest): Promise<CancelOrderResponse> {
    return this.post<CancelOrderResponse>('/orders/cancel', 'cancel_order', request);
  }

  async cancelStopOrder(request: CancelStopOrderRequest): Promise<CancelOrderResponse> {
    return this.post<CancelOrderResponse>('/orders/stop/cancel', 'cancel_stop_order', request);
  }

  async cancelAllOrders(request: CancelAllOrdersRequest): Promise<{ cancelled_count: number }> {
    return this.post<{ cancelled_count: number }>('/orders/cancel_all', 'cancel_all_orders', request);
  }

  async batchOrder(request: BatchOrderRequest): Promise<BatchOrderResponse> {
    return this.post<BatchOrderResponse>('/orders/batch', 'batch_order', request);
  }

  async createPositionTPSL(request: CreatePositionTPSLRequest): Promise<{ success: boolean }> {
    return this.post<{ success: boolean }>('/positions/tpsl', 'set_position_tpsl', request);
  }

  async updateLeverage(request: UpdateLeverageRequest): Promise<{ success: boolean }> {
    return this.post<{ success: boolean }>('/account/leverage', 'update_leverage', request);
  }

  async updateMarginMode(request: UpdateMarginModeRequest): Promise<{ success: boolean }> {
    return this.post<{ success: boolean }>('/account/margin', 'update_margin_mode', request);
  }

  async requestWithdrawal(request: WithdrawalRequest): Promise<{ success: boolean }> {
    return this.post<{ success: boolean }>('/account/withdraw', 'withdraw', request);
  }

  async listSubaccounts(): Promise<Array<{ subaccount_id: number; name: string; created_at: number }>> {
    return this.get<Array<{ subaccount_id: number; name: string; created_at: number }>>('/subaccounts');
  }

  async createSubaccount(request: CreateSubaccountRequest): Promise<{ success: boolean }> {
    // Note: This endpoint requires dual signatures (main_signature and sub_signature)
    // and does not use the standard signing flow. The request already contains both signatures.
    const url = `${this.baseUrl}/account/subaccount/create`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(request),
    });

    const responseData = await response.json();

    if (!response.ok) {
      if (isApiErrorResponse(responseData)) {
        handleHttpError(response.status, responseData.error, responseData.code);
      }
      handleHttpError(response.status, response.statusText);
    }

    if (!isApiResponse<{ success: boolean }>(responseData)) {
      throw new Error('Invalid API response format');
    }

    if (!responseData.success && responseData.error) {
      handleHttpError(response.status, responseData.error, responseData.code ?? undefined);
    }

    return responseData.data;
  }

  async subaccountFundTransfer(request: SubaccountFundTransferRequest): Promise<{ success: boolean; error: string | null }> {
    return this.post<{ success: boolean; error: string | null }>('/account/subaccount/transfer', 'subaccount_transfer', request);
  }
}
