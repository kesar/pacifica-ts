<!-- Source: https://docs.pacifica.fi/api-documentation/api/rest-api/markets/get-orderbook -->

Copy

```
/api/v1/book
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

Trading pair symbol

`BTC`

`"agg_level"`

integer

no

Aggregation level for price grouping. Defaults to `1`

`1`

Copy

```
api/v1/book?symbol=BTC
```

#### 

[](#response)

Response

*   Status 200: Successfully retrieved book data
    

Copy

```
{
  "success": true,
  "data": {
    "s": "BTC",
    "l": [
      [
        {
          "p": "106504",
          "a": "0.26203",
          "n": 1
        },
        {
          "p": "106498",
          "a": "0.29281",
          "n": 1
        }
      ],
      [
        {
          "p": "106559",
          "a": "0.26802",
          "n": 1
        },
        {
          "p": "106564",
          "a": "0.3002",
          "n": 1
        },
      ]
    ],
    "t": 1751370536325
  },
  "error": null,
  "code": null
}
```

Field

Type

Description

`'s'`

string

Symbol

`'l'`

array

Two-dimensional array containing bids (index 0) and asks (index 1). Each index contains up to 10 levels.

`'t'`

integer

Response timestamp in milliseconds

`'p'`

decimal string

Price level

`'a'`

decimal string

Total amount at price level

`'n'`

integer

Number of orders at level

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
    "api.pacifica.fi/api/v1/book?symbol=BTC",
    headers={"Accept": "*/*"},
)

data = response.json()
```

[PreviousGet mark price candle data](/api-documentation/api/rest-api/markets/get-mark-price-candle-data)[NextGet recent trades](/api-documentation/api/rest-api/markets/get-recent-trades)

Last updated 5 months ago