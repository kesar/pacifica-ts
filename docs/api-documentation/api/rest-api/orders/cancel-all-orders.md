<!-- Source: https://docs.pacifica.fi/api-documentation/api/rest-api/orders/cancel-all-orders -->

The [Pacifica Python SDK](https://github.com/pacifica-fi/python-sdk/blob/f2385d42e9ae5276ba2ba85505d51db2eefd2715/rest/cancel_all_orders.py) provides a comprehensive example on using this endpoint

Copy

```
POST /api/v1/orders/cancel_all
```

#### 

[](#operation-type-for-signing)

Operation Type (for signing)

Header Field

Type

Content

`"type"`

string

`"cancel_all_orders"`

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

required (if all\_symbols is false)

Trading pair symbol

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
  "all_symbols": true,
  "exclude_reduce_only": false,
  "symbol": "BTC",
  "agent_wallet": "69trU9A5...",
  "expiry_window": 30000
}
```

#### 

[](#response)

Response

*   Status 200: All orders cancelled successfully
    

Copy

```
  {
    "cancelled_count": 5
  }
```

*   Status 400: Bad request
    

Copy

```
  {
    "error": "Invalid parameters",
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
    "all_symbols": True,
    "exclude_reduce_only": False
}

response = requests.post(
    "/api/v1/orders/cancel_all",
    json=payload,
    headers={"Content-Type": "application/json"}
)

data = response.json()
```

[PreviousCancel order](/api-documentation/api/rest-api/orders/cancel-order)[NextCancel stop order](/api-documentation/api/rest-api/orders/cancel-stop-order)

Last updated 6 months ago