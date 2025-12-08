<!-- Source: https://docs.pacifica.fi/api-documentation/api/rest-api/account/request-withdrawal -->

Copy

```
POST /api/v1/account/withdraw
```

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

`"amount"`

string

required

Amount to withdraw in USDC

`100.50`

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
  "amount": "100.50",
  "agent_wallet": "69trU9A5...",
  "expiry_window": 30000,
}
```

#### 

[](#response)

Response

*   Status 200: Success
    

Copy

```
 {
    "success": true
  }
```

*   Status 400: Invalid request parameters
    
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
    "amount": "100.50"
}

response = requests.post(
    "/api/v1/account/withdraw",
    json=payload,
    headers={"Content-Type": "application/json"}
)

data = response.json()
```

[PreviousGet account balance history](/api-documentation/api/rest-api/account/get-account-balance-history)[NextSubaccounts](/api-documentation/api/rest-api/subaccounts)

Last updated 6 months ago