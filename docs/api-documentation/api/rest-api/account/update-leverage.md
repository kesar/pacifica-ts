<!-- Source: https://docs.pacifica.fi/api-documentation/api/rest-api/account/update-leverage -->

Copy

```
POST /api/v1/account/leverage
```

#### 

[](#operation-type-for-signing)

Operation Type (for signing)

Header Field

Type

Content

`"type"`

string

`"update_leverage"`

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

`"leverage"`

integer

required

New leverage value

`10`

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
  "leverage": 10,
  "timestamp": 1716200000000,
  "expiry_window": 30000,
  "agent_wallet": "69trU9A5...",
  "signature": "5j1Vy9UqY..."
}
```

#### 

[](#response)

Response

*   Status 200: Leverage updated successfully
    

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
    "error": "Invalid leverage",
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
    "leverage": 10
}

response = requests.post(
    "/api/v1/account/leverage",
    json=payload,
    headers={"Content-Type": "application/json"}
)

data = response.json()
```

[PreviousGet account settings](/api-documentation/api/rest-api/account/get-account-settings)[NextUpdate margin mode](/api-documentation/api/rest-api/account/update-margin-mode)

Last updated 6 months ago