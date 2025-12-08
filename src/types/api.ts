import type { MarginMode, OrderSide, StopOrderConfig, TimeInForce } from './common.js';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error: string | null;
  code: number | null;
}

export interface SignedRequestHeader {
  account: string;
  signature: string;
  timestamp: number;
  expiry_window?: number;
  agent_wallet?: string | null;
}

export interface SignatureHeader {
  timestamp: number;
  expiry_window?: number;
  type: string;
}

export interface CreateLimitOrderRequest {
  symbol: string;
  price: string;
  amount: string;
  side: OrderSide;
  tif: TimeInForce;
  reduce_only: boolean;
  client_order_id?: string;
  take_profit?: StopOrderConfig;
  stop_loss?: StopOrderConfig;
}

export interface CreateMarketOrderRequest {
  symbol: string;
  amount: string;
  side: OrderSide;
  reduce_only: boolean;
  client_order_id?: string;
  take_profit?: StopOrderConfig;
  stop_loss?: StopOrderConfig;
}

export interface CreateStopOrderRequest {
  symbol: string;
  stop_price: string;
  limit_price?: string;
  amount: string;
  side: OrderSide;
  tif: TimeInForce;
  reduce_only: boolean;
  client_order_id?: string;
}

export interface EditOrderRequest {
  order_id: number;
  price?: string;
  amount?: string;
  client_order_id?: string;
}

export interface CancelOrderRequest {
  order_id: number;
  client_order_id?: string;
}

export interface CancelStopOrderRequest {
  stop_order_id: number;
  client_order_id?: string;
}

export interface CancelAllOrdersRequest {
  symbol?: string;
}

export type BatchOrderItem =
  | { type: 'create'; order: CreateLimitOrderRequest }
  | { type: 'edit'; edit: EditOrderRequest }
  | { type: 'cancel'; cancel: CancelOrderRequest };

export interface BatchOrderRequest {
  orders: BatchOrderItem[];
}

export interface CreatePositionTPSLRequest {
  symbol: string;
  take_profit?: StopOrderConfig;
  stop_loss?: StopOrderConfig;
}

export interface UpdateLeverageRequest {
  symbol: string;
  leverage: number;
  margin_mode: MarginMode;
}

export interface UpdateMarginModeRequest {
  symbol: string;
  margin_mode: MarginMode;
}

export interface WithdrawalRequest {
  amount: string;
  destination_address: string;
}

export interface CreateSubaccountRequest {
  name: string;
}

export interface SubaccountFundTransferRequest {
  subaccount_id: number;
  amount: string;
  direction: 'deposit' | 'withdraw';
}

export interface GetOrderHistoryParams {
  symbol?: string;
  limit?: number;
  offset?: number;
  start_time?: number;
  end_time?: number;
}

export interface GetTradeHistoryParams {
  symbol?: string;
  limit?: number;
  offset?: number;
  start_time?: number;
  end_time?: number;
}

export interface GetCandleDataParams {
  symbol: string;
  interval: '1m' | '5m' | '15m' | '30m' | '1h' | '4h' | '1d' | '1w';
  start_time?: number;
  end_time?: number;
  limit?: number;
}

export interface GetOrderbookParams {
  symbol: string;
  depth?: number;
}

export interface GetRecentTradesParams {
  symbol: string;
  limit?: number;
}

export interface CreateOrderResponse {
  order_id: number;
}

export interface CancelOrderResponse {
  success: boolean;
}

export interface BatchOrderResponse {
  results: Array<{
    success: boolean;
    order_id?: number;
    error?: string;
  }>;
}
