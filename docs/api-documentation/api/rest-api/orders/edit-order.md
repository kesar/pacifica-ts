<!-- Source: https://docs.pacifica.fi/api-documentation/api/rest-api/orders/edit-order -->

Copy

```
POST /api/v1/orders/edit
```

#### 

[](#operation-type-for-signing)

Operation Type (for signing)

Header Field

Type

Content

`"type"`

string

`"edit_order"`

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

`"price"`

string

required

Order price

`50000`

`"amount"`

string

required

Order amount

`0.1`

`"order_id"`

integer

required (if no CLOID)

Exchange assigned order ID

`123456789`

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

Note: You must provide either `order_id` OR `client_order_id` but not both.

Copy

```
{
  "account": "42trU9A5...",
  "signature": "5j1Vy9Uq...",
  "timestamp": 1716200000000,
  "symbol": "BTC",
  "price": "90000",
  "amount": "0.5",
  "order_id": 123456789,
  "agent_wallet": "69trU9A5...",
  "expiry_window": 30000
}
```

#### 

[](#response)

Response

*   Status 200: Order created successfully
    

Copy

```
  {
    "order_id": 123498765
  }
```

*   Status 400: Bad request
    

Copy

```
{
  "success": false,
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
    "price": "90000",
    "amount": "0.5",
    "order_id": 123456789
}

response = requests.post(
    "/api/v1/orders/edit",
    json=payload,
    headers={"Content-Type": "application/json"}
)

data = response.json()
```

**Notes:** Editing an order cancels the original and creates a new one. The new order maintains the same side, reduce-only status, and client\_order\_id (if provided), is created with TIF = ALO (Post Only), and receives a new system-assigned order\_id.

Edit order is not subject to the taker speedbump.

[PreviousCancel stop order](/api-documentation/api/rest-api/orders/cancel-stop-order)[NextBatch order](/api-documentation/api/rest-api/orders/batch-order)

Last updated 9 days ago