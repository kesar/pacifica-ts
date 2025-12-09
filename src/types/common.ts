export interface ClientConfig {
  apiUrl?: string;
  wsUrl?: string;
  privateKey?: string;
  testnet?: boolean;
}

export type OrderSide = 'bid' | 'ask';

export type TimeInForce = 'GTC' | 'IOC' | 'ALO' | 'TOB';

export type MarginMode = 'cross' | 'isolated';

export type OrderStatus = 'pending' | 'open' | 'partially_filled' | 'filled' | 'cancelled' | 'expired' | 'rejected';

export interface StopOrderConfig {
  stop_price: string;
  limit_price?: string;
  client_order_id?: string;
}

export interface Position {
  symbol: string;
  side: OrderSide;
  amount: string;
  entry_price: string;
  margin?: string; // Only shown for isolated margin
  funding: string;
  isolated: boolean;
  created_at: number;
  updated_at: number;
}

export interface Order {
  order_id: number;
  client_order_id?: string;
  symbol: string;
  side: OrderSide;
  price: string;
  initial_amount: string;
  filled_amount: string;
  cancelled_amount: string;
  stop_price: string | null;
  order_type: string; // "limit" | "market" | "stop_limit" | "stop_market" | "take_profit_limit" | "stop_loss_limit" | "take_profit_market" | "stop_loss_market"
  stop_parent_order_id: number | null;
  reduce_only: boolean;
  created_at: number;
  updated_at: number;
}

export interface Trade {
  history_id: number;
  order_id: number;
  client_order_id?: string;
  symbol: string;
  amount: string;
  price: string;
  entry_price: string;
  fee: string;
  pnl: string;
  event_type: string; // "fulfill_taker" | "fulfill_maker"
  side: string; // "open_long" | "open_short" | "close_long" | "close_short"
  created_at: number;
  cause: string; // "normal" | "market_liquidation" | "backstop_liquidation" | "settlement"
}

export interface MarketInfo {
  symbol: string;
  tick_size: string;
  min_tick: string;
  max_tick: string;
  lot_size: string;
  max_leverage: number;
  isolated_only: boolean;
  min_order_size: string;
  max_order_size: string;
  funding_rate: string;
  next_funding_rate: string;
  created_at: number;
}

export interface PriceData {
  funding: string;
  mark: string;
  mid: string;
  next_funding: string;
  open_interest: string;
  oracle: string;
  symbol: string;
  timestamp: number;
  volume_24h: string;
  yesterday_price: string;
}

export interface OrderbookLevel {
  price: string;
  amount: string;
}

export interface Orderbook {
  symbol: string;
  bids: OrderbookLevel[];
  asks: OrderbookLevel[];
  timestamp: number;
}

export interface Candle {
  timestamp: number; // Start time
  end_time: number; // End time
  symbol: string;
  interval: string;
  open: string;
  close: string;
  high: string;
  low: string;
  volume: string;
  number_of_trades: number;
}

export interface AccountInfo {
  balance: string;
  fee_level: number;
  account_equity: string;
  available_to_spend: string;
  available_to_withdraw: string;
  pending_balance: string;
  total_margin_used: string;
  cross_mmr: string;
  positions_count: number;
  orders_count: number;
  stop_orders_count: number;
  updated_at: number;
  use_ltp_for_stop_orders: boolean;
}
