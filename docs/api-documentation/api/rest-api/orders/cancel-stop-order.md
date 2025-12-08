<!-- Source: https://docs.pacifica.fi/api-documentation/api/rest-api/orders/cancel-stop-order -->

Copy

```
POST /api/v1/orders/stop/cancel
```

#### 

[](#operation-type-for-signing)

Operation Type (for signing)

Header Field

Type

Content

`"type"`

string

`"cancel_stop_order"`

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

*   Status 200: Stop order cancelled successfully
    

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
    "error": "Stop order not found",
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
    "/api/v1/orders/stop/cancel",
    json=payload,
    headers={"Content-Type": "application/json"}
)

data = response.json()
```

[PreviousCancel all orders](/api-documentation/api/rest-api/orders/cancel-all-orders)[NextEdit order](/api-documentation/api/rest-api/orders/edit-order)

Last updated 6 months ago