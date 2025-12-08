<!-- Source: https://docs.pacifica.fi/api-documentation/api/websocket/trading-operations/create-market-order -->

The [Pacifica Python SDK](https://github.com/pacifica-fi/python-sdk/blob/f2385d42e9ae5276ba2ba85505d51db2eefd2715/ws/create_order.py) provides a comprehensive example on using this endpoint.

### 

[](#request)

Request

Copy

```
{
  "id": "660065de-8f32-46ad-ba1e-83c93d3e3966",
  "params": {
    "create_market_order": {
      "account": "AwX6321...",
      "signature": "5vnYpt...",
      "timestamp": 1749223025396,
      "expiry_window": 5000,
      "symbol": "BTC",
      "reduce_only": false,
      "amount": "0.001",
      "side": "bid",
      "slippage_percent": "0.5",
      "client_order_id": "79f948fd-7556-4066-a128-083f3ea49322"
    }
  }
}
```

Field

Type

Need

Description

Example

`"id"`

Full UUID string

required

Client-defined request ID

`660065de-8f32-46ad-ba1e-83c93d3e3966`

`"params"`

object

required

Contains action type and action parameters

`"create_order"`

`"create_market_order"`

object

required

Specifies action type and contains parameters

See examples.

`"account"`

string

required

User's wallet address

`42trU9A5...`

`"agent_wallet"`

string

optional

Agent wallet address

`69trU9A5...`

`"signature"`

string

required

Cryptographic signature

`5j1Vy9Uq...`

`"timestamp"`

integer

required

Current timestamp in milliseconds

`1716200000000`

`"expiry_window"`

integer

optional

Signature expiry in milliseconds

`30000`

`"symbol"`

string

required

Trading pair symbol

`BTC`

`"reduce_only"`

boolean

required

Whether the order is reduce-only

`false`

`"amount"`

string

required

Order amount

`0.1`

`"side"`

string

required

Order side (bid/ask)

`bid`

`"slippage_percent"`

string

required

Maximum allowed slippage in percentage, e.g. "0.5" means 0.5% max slippage

`0.5`

`"client_order_id"`

Full UUID string

optional

Client-defined order ID

`f47ac10b-58cc-4372-a567-0e02b2c3d479`

`"take_profit"`

object

optional

Take profit stop order configuration

See next three rows

`"stop_price"`

string

required (if `"take_profit"` exists)

Stop trigger price

`55000`

`"limit_price"`

string

optional

Limit price for the triggered order

`54950`

`"client_order_id"`

Full UUID string

optional

Client-defined order ID for the stop order

`e36ac10b-58cc-4372-a567-0e02b2c3d479`

`"stop_loss"`

object

optional

Stop loss order configuration

See next three rows

`"stop_price"`

string

required (if `"stop_loss"` exists)

Stop trigger price

`48000`

`"limit_price"`

string

optional

Limit price for the triggered order

`47950`

`"client_order_id"`

Full UUID string

optional

Client-defined order ID for the stop order

`d25ac10b-58cc-4372-a567-0e02b2c3d479`

### 

[](#response)

Response

Copy

```
{
  "code": 200,
  "data": {
    "I": "79f948fd-7556-4066-a128-083f3ea49322",
    "i": 645953,
    "s": "BTC"
  },
  "id": "660065de-8f32-46ad-ba1e-83c93d3e3966",
  "t": 1749223025962,
  "type": "create_market_order"
}
```

Field

Type

Description

`'code'`

integer

Status code

`'data'`

object

Contains information about placed order

`'I'`

string

CLOID (if provided)

`'i'`

integer

Order ID

`'s'`

string

Symbol

`'id'`

string

Client-defined request ID

`'t'`

integer

Timestamp in milliseconds

`'type'`

string

Specifies action type

Note: In order to protect liquidity providers from adverse selection, all market orders are subject to a ~200ms delay.

[PreviousTrading operations](/api-documentation/api/websocket/trading-operations)[NextCreate limit order](/api-documentation/api/websocket/trading-operations/create-limit-order)

Last updated 9 days ago