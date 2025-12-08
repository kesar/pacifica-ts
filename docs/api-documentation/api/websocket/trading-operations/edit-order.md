<!-- Source: https://docs.pacifica.fi/api-documentation/api/websocket/trading-operations/edit-order -->

The [Pacifica Python SDK](https://github.com/pacifica-fi/python-sdk/blob/f2385d42e9ae5276ba2ba85505d51db2eefd2715/ws/create_order.py) provides a comprehensive example on using this endpoint.

### 

[](#request)

Request

Copy

```
{
  "id": "660065de-8f32-46ad-ba1e-83c93d3e3966",
  "params": {
    "edit_order": {
      "account": "AwX6321...",
      "signature": "5vnYpt...",
      "timestamp": 1749223025396,
      "expiry_window": 5000,
      "symbol": "BTC",
      "price": "99500",
      "amount": "0.002",
      "order_id": 645953
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

`"edit_order"`

`"edit_order"`

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

`"price"`

string

required

Order price

`99500`

`"amount"`

string

required

Order amount

`0.002`

`"order_id"`

integer

optional

System-defined order ID (needed if no CLOID provided)

`645953`

`"client_order_id"`

Full UUID string

optional

Client-defined order ID (needed if no OID provided)

`f47ac10b-58cc-4372-a567-0e02b2c3d479`

### 

[](#response)

Response

Copy

```
{
  "code": 200,
  "data": {
    "I": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "i": 645954,
    "s": "BTC"
  },
  "id": "660065de-8f32-46ad-ba1e-83c93d3e3966",
  "t": 1749223026150,
  "type": "edit_order"
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

CLOID (if original order contained one)

`'i'`

integer

New order ID

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

**Notes:** Editing an order cancels the original and creates a new one. The new order maintains the same side, reduce-only status, and client\_order\_id (if provided), is created with TIF = ALO (Post Only), and receives a new system-assigned order\_id. Edit order is not subject to the taker speedbump.

[PreviousCreate limit order](/api-documentation/api/websocket/trading-operations/create-limit-order)[NextBatch order](/api-documentation/api/websocket/trading-operations/batch-order)

Last updated 9 days ago