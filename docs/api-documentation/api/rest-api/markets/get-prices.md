<!-- Source: https://docs.pacifica.fi/api-documentation/api/rest-api/markets/get-prices -->

Copy

```
GET /api/v1/info/prices
```

#### 

[](#response)

Response

*   Status 200: Success
    

Copy

```
 {
  "success": true,
  "data": [
    {
      "funding": "0.00010529",
      "mark": "1.084819",
      "mid": "1.08615",
      "next_funding": "0.00011096",
      "open_interest": "3634796",
      "oracle": "1.084524",
      "symbol": "XPL",
      "timestamp": 1759222967974,
      "volume_24h": "20896698.0672",
      "yesterday_price": "1.3412"
    }
  ],
  "error": null,
  "code": null
}
```

Field

Type

Description

`"funding"`

decimal string

funding rate paid in the past funding epoch (hour)

`"mark"`

decimal string

Mark price, as defined above

`"mid"`

decimal string

Mid price, defined as the average of the best bid and best ask price

`"next_funding"`

decimal string

estimated funding rate to be paid in the next funding epoch (hour)

`"open_interest"`

decimal string

The current open interest on this symbol (in USD)

`"oracle"`

decimal string

Oracle price, as defined above

`"symbol"`

string

Trading pair symbol

`"timestamp"`

integer

Timestamp in Milliseconds

`"volume_24h"`

boolean

Volume (USD) of this market in the past 24 hours

`"yesterday_price"`

decimal string

Oracle price of this market 24 hours ago (USD)

*   Status 404: No prices data available
    
*   Status 500: Internal server error
    

#### 

[](#code-example-python)

Code Example (Python)

Copy

```
import requests

response = requests.get(
    "/api/v1/info/prices",
    headers={"Accept": "*/*"},
)

data = response.json()
```

[PreviousGet market info](/api-documentation/api/rest-api/markets/get-market-info)[NextGet candle data](/api-documentation/api/rest-api/markets/get-candle-data)

Last updated 2 months ago