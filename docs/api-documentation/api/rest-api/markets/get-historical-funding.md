<!-- Source: https://docs.pacifica.fi/api-documentation/api/rest-api/markets/get-historical-funding -->

Copy

```
GET /api/v1/funding_rate/history
```

#### 

[](#query-parameters)

Query Parameters

Field

Type

Need

Description

Example

`"symbol"`

string

required

Market symbol to query

`BTC`

`"limit"`

integer

optional

Number of records to show (default 100, max 4000)

`20`

`"cursor"`

string

optional

Cursor pagination to access records. Default to none

`1115hVka`

Copy

```
/api/v1/funding_rate/history?symbol=BTC&limit=20&cursor=11115hVka
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
      "oracle_price": "117170.410304",
      "bid_impact_price": "117126",
      "ask_impact_price": "117142",
      "funding_rate": "0.0000125",
      "next_funding_rate": "0.0000125",
      "created_at": 1753806934249
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

`'oracle_price'`

decimal string

Oracle price used for [funding rate calculation](https://docs.pacifica.fi/trading-on-pacifica/funding-rates)

`'bid_impact_price'`

decimal string

Bid impact price at time of calculation (see funding rate docs)

`'ask_impact_price'`

decimal string

Ask impact price at time of calculation (see funding rate docs)

`'funding_rate'`

decimal string

Last settled funding rate

`'next_funding_rate'`

decimal string

Predicted funding rate for next settlement

`'created_at'`

integer

Timestamp in milliseconds

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
    "/api/v1/funding_rate/history?symbol=BTC",
    headers={"Accept": "*/*"},
)

data = response.json()
```

[PreviousGet recent trades](/api-documentation/api/rest-api/markets/get-recent-trades)[NextAccount](/api-documentation/api/rest-api/account)

Last updated 1 month ago