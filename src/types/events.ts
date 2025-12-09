import type { AccountInfo, Candle, Order, Orderbook, Position, PriceData, Trade } from './common.js';

export interface WebSocketMessage {
  method: 'subscribe' | 'unsubscribe' | 'ping';
  params?: Record<string, unknown>;
}

export interface WebSocketSubscribeMessage extends WebSocketMessage {
  method: 'subscribe';
  params: SubscriptionParams;
}

export interface WebSocketUnsubscribeMessage extends WebSocketMessage {
  method: 'unsubscribe';
  params: SubscriptionParams;
}

export type SubscriptionParams =
  | { source: 'prices' }
  | { source: 'orderbook'; symbol: string }
  | { source: 'bbo'; symbol: string }
  | { source: 'trades'; symbol: string }
  | { source: 'candle'; symbol: string; interval: string }
  | { source: 'mark_price_candle'; symbol: string; interval: string }
  | { source: 'account_margin'; account: string }
  | { source: 'account_leverage'; account: string }
  | { source: 'account_info'; account: string }
  | { source: 'account_positions'; account: string }
  | { source: 'account_orders'; account: string }
  | { source: 'account_order_updates'; account: string }
  | { source: 'account_trades'; account: string };

export interface WebSocketEvent<T = unknown> {
  channel: string;
  data: T;
}

export interface PongEvent {
  channel: 'pong';
}

export interface PricesEvent extends WebSocketEvent<PriceData[]> {
  channel: 'prices';
}

export interface OrderbookEvent extends WebSocketEvent<Orderbook> {
  channel: 'orderbook';
}

export interface BestBidOfferEvent
  extends WebSocketEvent<{
    symbol: string;
    best_bid: string;
    best_ask: string;
    timestamp: number;
  }> {
  channel: 'bbo';
}

export interface TradesEvent extends WebSocketEvent<Trade[]> {
  channel: 'trades';
}

export interface CandleEvent extends WebSocketEvent<Candle> {
  channel: 'candle';
}

export interface MarkPriceCandleEvent extends WebSocketEvent<Candle> {
  channel: 'mark_price_candle';
}

export interface AccountMarginEvent
  extends WebSocketEvent<{
    account: string;
    margin_mode: string;
    cross_mmr: string;
    total_margin_used: string;
    available_to_spend: string;
    timestamp: number;
  }> {
  channel: 'account_margin';
}

export interface AccountLeverageEvent
  extends WebSocketEvent<{
    account: string;
    symbol: string;
    leverage: number;
    margin_mode: string;
    timestamp: number;
  }> {
  channel: 'account_leverage';
}

export interface AccountInfoEvent extends WebSocketEvent<AccountInfo> {
  channel: 'account_info';
}

export interface AccountPositionsEvent extends WebSocketEvent<Position[]> {
  channel: 'account_positions';
}

export interface AccountOrdersEvent extends WebSocketEvent<Order[]> {
  channel: 'account_orders';
}

export interface AccountOrderUpdateEvent
  extends WebSocketEvent<{
    order: Order;
    update_type: 'created' | 'filled' | 'partially_filled' | 'cancelled' | 'expired';
  }> {
  channel: 'account_order_updates';
}

export interface AccountTradesEvent extends WebSocketEvent<Trade[]> {
  channel: 'account_trades';
}

export interface WebSocketErrorEvent
  extends WebSocketEvent<{
    code: number;
    message: string;
  }> {
  channel: 'error';
}

export interface WebSocketTradingOperation {
  /**
   * Unique request identifier (UUID). Used to correlate requests with responses.
   */
  id: string;
  /**
   * Operation type (e.g., 'create_order', 'cancel_order', 'edit_order', etc.)
   */
  type: string;
  /**
   * Operation-specific data (will be signed automatically)
   */
  data: Record<string, unknown>;
}

export type PacificaWebSocketEvent =
  | PongEvent
  | PricesEvent
  | OrderbookEvent
  | BestBidOfferEvent
  | TradesEvent
  | CandleEvent
  | MarkPriceCandleEvent
  | AccountMarginEvent
  | AccountLeverageEvent
  | AccountInfoEvent
  | AccountPositionsEvent
  | AccountOrdersEvent
  | AccountOrderUpdateEvent
  | AccountTradesEvent
  | WebSocketErrorEvent;

export type WebSocketEventMap = {
  open: () => void;
  close: (code: number, reason: string) => void;
  error: (error: Error) => void;
  pong: () => void;
  prices: (data: PriceData[]) => void;
  orderbook: (data: Orderbook) => void;
  bbo: (data: { symbol: string; best_bid: string; best_ask: string; timestamp: number }) => void;
  trades: (data: Trade[]) => void;
  candle: (data: Candle) => void;
  mark_price_candle: (data: Candle) => void;
  account_margin: (data: {
    account: string;
    margin_mode: string;
    cross_mmr: string;
    total_margin_used: string;
    available_to_spend: string;
    timestamp: number;
  }) => void;
  account_leverage: (data: {
    account: string;
    symbol: string;
    leverage: number;
    margin_mode: string;
    timestamp: number;
  }) => void;
  account_info: (data: AccountInfo) => void;
  account_positions: (data: Position[]) => void;
  account_orders: (data: Order[]) => void;
  account_order_updates: (data: Array<{
    order: Order;
    update_type: 'created' | 'filled' | 'partially_filled' | 'cancelled' | 'expired';
  }>) => void;
  account_trades: (data: Trade[]) => void;
  ws_error: (data: { code: number; message: string }) => void;
};

/**
 * Helper type to extract the data parameter type from a WebSocketEventMap event.
 *
 * @example
 * ```typescript
 * type PricesData = ExtractEventData<'prices'>; // PriceData[]
 * type OrderbookData = ExtractEventData<'orderbook'>; // Orderbook
 * ```
 */
export type ExtractEventData<K extends keyof WebSocketEventMap> = WebSocketEventMap[K] extends (data: infer T) => void
  ? T
  : never;
