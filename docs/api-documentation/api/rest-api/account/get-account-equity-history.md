<!-- Source: https://docs.pacifica.fi/api-documentation/api/rest-api/account/get-account-equity-history -->

Copy

```
GET /api/v1/portfolio
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

User's wallet address

`42trU9A5...`

`"time_range"`

string

required

Time range of history: `1d`, `7d`, `14d`, `30d`, `all`

`7d`

`"start_time"`

integer

optional

Start time in milliseconds

`1760271000000`

`"end_time"`

integer

optional

End time in milliseconds

`1761842220000`

`"limit"`

integer

optional

Maximum number of records to return, defaults to 100

`100`

Copy

```
/api/v1/portfolio?account=42trU9A5...&time_range=7d
```

#### 

[](#response)

Response

*   Status 200: Successfully retrieved portfolio history
    

Copy

```
{
  "success": true,
  "data": [
    {
      "account_equity": "61046.308885",
      "pnl": "9297.553505",
      "timestamp": 1761177600000
    },
    ...
  ],
  "error": null,
  "code": null
}
```

Field

Type

Description

`'account_equity'`

decimal string

Account equity (balance + unrealized PnL) at last update

`'PnL'`

decimal string

PnL of account since creation

`'timestamp'`

integer

Timestamp in milliseconds of last account equity update

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
    "/api/v1/portfolio?account=42trU9A5...&time_range=7d",
    headers={"Accept": "*/*"},
)

data = response.json()
```

[PreviousGet funding history](/api-documentation/api/rest-api/account/get-funding-history)[NextGet account balance history](/api-documentation/api/rest-api/account/get-account-balance-history)

Last updated 1 month ago