<!-- Source: https://docs.pacifica.fi/api-documentation/api/rest-api/account/update-margin-mode -->

Copy

```
POST /api/v1/account/margin
```

#### 

[](#operation-type-for-signing)

Operation Type (for signing)

Header Field

Type

Content

"type"

string

`"update_margin_mode"`

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

`"symbol"`

string

required

Trading pair symbol

`BTC`

`"is_isolated"`

boolean

required

Margin mode (true for isolated, false for cross)

`false`

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

Copy

```
{
  "account": "42trU9A5...",
  "symbol": "BTC",
  "is_isolated": false,
  "timestamp": 1716200000000,
  "expiry_window": 30000,
  "agent_wallet": "69trU9A5...",
  "signature": "5j1Vy9Uq..."
}
```

#### 

[](#response)

Response

*   Status 200: Margin mode updated successfully
    

Copy

```
 {
    "success": true
  }
```

*   Status 400: Invalid request parameters
    

Copy

```
  {
    "error": "Invalid margin mode",
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
    "signature": "5j1Vy9Uq",
    "timestamp": 1716200000000,
    "symbol": "BTC",
    "is_isolated": false
}

response = requests.post(
    "/api/v1/account/margin",
    json=payload,
    headers={"Content-Type": "application/json"}
)

data = response.json()
```

[PreviousUpdate leverage](/api-documentation/api/rest-api/account/update-leverage)[NextGet positions](/api-documentation/api/rest-api/account/get-positions)

Last updated 6 months ago