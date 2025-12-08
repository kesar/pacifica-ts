<!-- Source: https://docs.pacifica.fi/api-documentation/api/rest-api/account/get-funding-history -->

Copy

```
GET /api/v1/funding/history
```

#### 

[](#query-parameters)

Query Parameters

Field

Type

Need

Description

Example

`"account"`

string

required

Trading pair symbol

`42trU9A5...`

`"limit"`

integer

optional

Maximum number of records to return default system defined limit

`100`

`"cursor"`

string

optional

Cursor pagination to access records. Default to none

`1115hVka`

Copy

```
/api/v1/funding/history?account=42trU9A5...&limit=20&cursor=11115hVka
```

#### 

[](#response)

Response

*   Status 200: Successfully retrieved funding history
    

Copy

```
  {
  "success": true,
  "data": [
    {
      "history_id": 2287920,
      "symbol": "PUMP",
      "side": "ask",
      "amount": "39033804",
      "payout": "2.617479",
      "rate": "0.0000125",
      "created_at": 1759222804122
    },
    ...
  ],
  "next_cursor": "11114Lz77",
  "has_more": true
}
```

Field

Type

Description

`"history_id"`

integer

History id of trade

`"symbol"`

string

Trading pair symbol

`"side"`

string

If the position resulting in the funding payment was long or short (bid or ask)

`"amount"`

decimal string

Amount (in token denomination) of the position that resulted in the funding payment

`"payout"`

decimal string

Funding paid (in USD)

`"rate"`

decimal string

Funding rate that was used to calculate the payput

`"created_at"`

integer

Timestamp in milliseconds when the funding payment was logged

`'next_cursor'`

string

Next cursor for pagination

`'has_more'`

boolean

True if there exists a `'next_cursor'`

*   Status 400: Invalid request parameters
    
*   Status 401: Unauthorized access
    
*   Status 500: Internal server error
    

#### 

[](#code-example-python)

Code Example (Python)

Copy

```
import requests

response = requests.get(
    "/api/v1/funding/history?account=42trU9A5...&limit=20&cursor=11115hVka",
    headers={"Accept": "*/*"},
)

data = response.json()
```

[PreviousGet trade history](/api-documentation/api/rest-api/account/get-trade-history)[NextGet account equity history](/api-documentation/api/rest-api/account/get-account-equity-history)

Last updated 1 month ago