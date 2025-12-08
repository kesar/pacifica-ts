<!-- Source: https://docs.pacifica.fi/api-documentation/api/rest-api/account/get-positions -->

Copy

```
GET /api/v1/positions
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

Connected wallet address

`42trU9A5...`

Copy

```
/api/v1/positions?account=42trU9A5...
```

#### 

[](#response)

Response

*   Status 200: Successfully retrieved account information
    

Copy

```
  {
  "success": true,
  "data": [
    {
      "symbol": "AAVE",
      "side": "ask",
      "amount": "223.72",
      "entry_price": "279.283134",
      "margin": "0", // only shown for isolated margin
      "funding": "13.159593",
      "isolated": false,
      "created_at": 1754928414996,
      "updated_at": 1759223365538
    }
  ],
  "error": null,
  "code": null
}
```

Field

Type

Description

`"symbol"`

string

Trading pair symbol

`"side"`

string

Whether the position is long/short

`"entry_price"`

decimal string

Entry price of the position. Takes VWAP if position was opened by multiple trades executed at different prices.

`"margin"`

decimal string

Amount of margin allocated to an isolated position (only shown when isolated)

`"funding"`

decimal string

Funding paid by this position since open

`"isolated"`

boolean

If the position is opened in isolated margin mode

`"created_at"`

integer

Timestamp in milliseconds when these settings were adjusted from their default

`"updated_at"`

integer

Timestamp in milliseconds when these settings were last updated

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
    "/api/v1/positions?account=42trU9A5...",
    headers={"Accept": "*/*"},
)

data = response.json()
```

[PreviousUpdate margin mode](/api-documentation/api/rest-api/account/update-margin-mode)[NextGet trade history](/api-documentation/api/rest-api/account/get-trade-history)

Last updated 2 months ago