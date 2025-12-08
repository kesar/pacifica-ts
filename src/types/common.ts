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
  size: string;
  entry_price: string;
  mark_price: string;
  liquidation_price: string;
  unrealized_pnl: string;
  margin_mode: MarginMode;
  leverage: number;
  margin_used: string;
  maintenance_margin: string;
  position_id: number;
  updated_at: number;
}

export interface Order {
  order_id: number;
  client_order_id?: string;
  symbol: string;
  side: OrderSide;
  price: string;
  amount: string;
  filled: string;
  status: OrderStatus;
  tif: TimeInForce;
  reduce_only: boolean;
  created_at: number;
  updated_at: number;
}

export interface Trade {
  trade_id: number;
  order_id: number;
  symbol: string;
  side: OrderSide;
  price: string;
  amount: string;
  fee: string;
  realized_pnl: string;
  timestamp: number;
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
  timestamp: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
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
