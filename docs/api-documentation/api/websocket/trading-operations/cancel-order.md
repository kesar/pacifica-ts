<!-- Source: https://docs.pacifica.fi/api-documentation/api/websocket/trading-operations/cancel-order -->

The [Pacifica Python SDK](https://github.com/pacifica-fi/python-sdk/blob/f2385d42e9ae5276ba2ba85505d51db2eefd2715/ws/cancel_order.py) provides a comprehensive example on using this endpoint.

### 

[](#request)

Request

Copy

```
{
  "id": "1bb2b72f-f545-4938-8a38-c5cda8823675",
  "params": {
    "cancel_order": {
      "account": "AwX6321...",
      "signature": "4RqbgB...",
      "timestamp": 1749223343149,
      "expiry_window": 5000,
      "symbol": "BTC",
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

`1bb2b72f-f545-4938-8a38-c5cda8823675`

`"params"`

object

required

Contains action type and action parameters

`"cancel_order"`

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

`"symbol"`

string

required

Trading pair symbol

`BTC`

`"order_id"`

integer

required (if no CLOID)

Exchange-assigned order ID

`123`

`"client_order_id"`

Full UUID string

required (if no OID)

Client-defined order ID

`f47ac10b-58cc-4372-a567-0e02b2c3d479`

### 

[](#response)

Response

Copy

```
{
  "code": 200,
  "data": {
    "I": "79f948fd-7556-4066-a128-083f3ea49322",
    "i": null,
    "s": "BTC"
  },
  "id": "1bb2b72f-f545-4938-8a38-c5cda8823675",
  "t": 1749223343610,
  "type": "cancel_order"
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

Same as above request ID

`'t'`

integer

Timestamp in milliseconds

`'type'`

string

Specifies action type

Cancel are not subject to any speedbump.

[PreviousBatch order](/api-documentation/api/websocket/trading-operations/batch-order)[NextCancel all orders](/api-documentation/api/websocket/trading-operations/cancel-all-orders)

Last updated 9 days ago