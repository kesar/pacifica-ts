import type { OrderSide, StopOrderConfig, TimeInForce } from './common.js';

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
  slippage_percent: string;
  client_order_id?: string;
  take_profit?: StopOrderConfig;
  stop_loss?: StopOrderConfig;
}

export interface CreateStopOrderRequest {
  symbol: string;
  side: OrderSide;
  reduce_only: boolean;
  stop_order: {
    stop_price: string;
    limit_price?: string;
    client_order_id?: string;
    amount: string;
  };
}

export interface EditOrderRequest {
  symbol: string;
  price: string;
  amount: string;
  order_id?: number;
  client_order_id?: string;
}

export interface CancelOrderRequest {
  symbol: string;
  order_id?: number;
  client_order_id?: string;
}

export interface CancelStopOrderRequest {
  symbol: string;
  order_id: number;
  client_order_id?: string;
}

export interface CancelAllOrdersRequest {
  all_symbols: boolean;
  exclude_reduce_only: boolean;
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
  side: OrderSide;
  take_profit?: StopOrderConfig;
  stop_loss?: StopOrderConfig;
}

export interface UpdateLeverageRequest {
  symbol: string;
  leverage: number;
}

export interface UpdateMarginModeRequest {
  symbol: string;
  is_isolated: boolean;
}

export interface WithdrawalRequest {
  amount: string;
}

export interface CreateSubaccountRequest {
  main_account: string;
  subaccount: string;
  main_signature: string;
  sub_signature: string;
  timestamp: number;
  expiry_window?: number;
}

export interface SubaccountFundTransferRequest {
  to_account: string;
  amount: string;
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
  interval: '1m' | '3m' | '5m' | '15m' | '30m' | '1h' | '2h' | '4h' | '8h' | '12h' | '1d';
  start_time: number;
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
