<!-- Source: https://docs.pacifica.fi/api-documentation/api/websocket/trading-operations/cancel-all-orders -->

The [Pacifica Python SDK](https://github.com/pacifica-fi/python-sdk/blob/f2385d42e9ae5276ba2ba85505d51db2eefd2715/ws/cancel_all_orders.py) provides a comprehensive example on using this endpoint.

### 

[](#request)

Request

Copy

```
{
  "id": "4e9b4edb-b123-4759-9250-d19db61fabcb",
  "params": {
    "cancel_all_orders": {
      "account": "AwX6f3...",
      "signature": "2XP8fz...",
      "timestamp": 1749221927343,
      "expiry_window": 5000,
      "all_symbols": true,
      "exclude_reduce_only": false
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

`1bb2b72f-f545-4938-8a38-c5cda8823675`

`"params"`

object

required

Contains action type and action parameters

`"cancel_all_orders"`

`"cancel_order"`

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

`"all_symbols"`

boolean

required

Whether to cancel orders for all symbols

`true`

`"exclude_reduce_only"`

boolean

required

Whether to exclude reduce-only orders

`false`

`"symbol"`

string

required (if `"all_symbols"` is false)

Trading pair symbol

`BTC`

Copy

```
{
  "code": 200,
  "data": {
    "cancelled_count": 10
  },
  "id": "b86b4f45-49da-4191-84e2-93e141acdeab",
  "t": 1749221787291,
  "type": "cancel_all_orders"
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

`'cancelled_count'`

string

Number of orders successfully cancelled

`'id'`

string

Same as above request ID

`'t'`

integer

Timestamp in milliseconds

`'type'`

string

Specifies action type

[PreviousCancel order](/api-documentation/api/websocket/trading-operations/cancel-order)[NextSigning](/api-documentation/api/signing)

Last updated 6 months ago