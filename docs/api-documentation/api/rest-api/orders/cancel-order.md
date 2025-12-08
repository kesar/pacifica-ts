<!-- Source: https://docs.pacifica.fi/api-documentation/api/rest-api/orders/cancel-order -->

The [Pacifica Python SDK](https://github.com/pacifica-fi/python-sdk/blob/f2385d42e9ae5276ba2ba85505d51db2eefd2715/rest/cancel_order.py) provides a comprehensive example on using this endpoint.

Copy

```
POST /api/v1/orders/cancel
```

#### 

[](#operation-type-for-signing)

Operation Type (for signing)

Header Field

Type

Content

`"type"`

string

`"cancel_order"`

#### 

[](#request-body)

Request Body

Field

Type

Need

Description

Example

`"account"`

string

required

User's wallet address

`42trU9A5...`

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

`"agent_wallet"`

string

optional

Agent wallet address

`69trU9A5...`

`"expiry_window"`

integer

optional

Signature expiry in milliseconds

`30000`

Copy

```
{
  "account": "42trU9A5...",
  "signature": "5j1Vy9Uq...",
  "timestamp": 1716200000000,
  "symbol": "BTC",
  "order_id": 123,
  "agent_wallet": "69trU9A5...",
  "expiry_window": 30000
}
```

#### 

[](#response)

Response

*   Status 200: Order cancelled successfully
    

Copy

```
  {
    "success": true
  }
```

*   Status 400: Bad request
    

Copy

```
  {
    "error": "Order not found",
    "code": 400
  }
```

*   Status 500: Internal server error
    

#### 

[](#code-example-python)

Code Example (Python)

Copy

```
import requests

payload = {
    "account": "42trU9A5...",
    "signature": "5j1Vy9Uq...",
    "timestamp": 1716200000000,
    "symbol": "BTC",
    "order_id": 123
}

response = requests.post(
    "/api/v1/orders/cancel",
    json=payload,
    headers={"Content-Type": "application/json"}
)

data = response.json()
```

Cancel requests are not affected by any speedbumps.

[PreviousCreate position TP/SL](/api-documentation/api/rest-api/orders/create-position-tp-sl)[NextCancel all orders](/api-documentation/api/rest-api/orders/cancel-all-orders)

Last updated 9 days ago