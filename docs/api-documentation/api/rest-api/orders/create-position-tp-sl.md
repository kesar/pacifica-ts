<!-- Source: https://docs.pacifica.fi/api-documentation/api/rest-api/orders/create-position-tp-sl -->

Copy

```
POST /api/v1/positions/tpsl
```

#### 

[](#operation-type-for-signing)

Operation Type (for signing)

Header Field

Type

Content

`"type"`

string

`"set_position_tpsl"`

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

`"side"`

string

required

Order side (bid/ask)

`bid`

`"take_profit"`

object

optional (if there is SL)

Take profit stop order configuration

See next three rows

`"stop_price"`

string

required

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

optional (if there is TP)

Stop loss order configuration

See next three rows

`"stop_price"`

string

required

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
  "side": "bid",
  "take_profit": {
    "stop_price": "55000",
    "limit_price": "54950",
    "client_order_id": "e36ac10b-58cc-4372-a567-0e02b2c3d479"
  },
  "stop_loss": {
    "stop_price": "48000",
    "limit_price": "47950",
    "client_order_id": "d25ac10b-58cc-4372-a567-0e02b2c3d479"
  },
  "agent_wallet": "69trU9A5...",
  "expiry_window": 30000
}
```

#### 

[](#response)

Response

*   Status 200: Take profit and stop loss set successfully
    

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
    "error": "Position not found",
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
    "side": "bid",
    "take_profit": {
        "stop_price": "55000",
        "limit_price": "54950"
    },
    "stop_loss": {
        "stop_price": "48000",
        "limit_price": "47950"
    }
}

response = requests.post(
    "/api/v1/positions/tpsl",
    json=payload,
    headers={"Content-Type": "application/json"}
)

data = response.json()
```

[PreviousCreate stop order](/api-documentation/api/rest-api/orders/create-stop-order)[NextCancel order](/api-documentation/api/rest-api/orders/cancel-order)

Last updated 3 months ago