<!-- Source: https://docs.pacifica.fi/api-documentation/api/rest-api/markets/get-recent-trades -->

Copy

```
GET /api/v1/trades
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

Copy

```
/api/v1/trades?symbol=BTC
```

#### 

[](#response)

Response

*   Status 200: Successfully retrieved recent trades
    

Copy

```
{
  "success": true,
  "data": [
    {
      "event_type": "fulfill_taker",
      "price": "104721",
      "amount": "0.0001",
      "side": "close_long",
      "cause": "normal",
      "created_at": 1749289837752
    }
}
```

Field

Type

Description

`'event_type'`

string

`"fulfill_taker"` if maker `"fulfill_maker"` if taker

`'price'`

decimal string

Price in USD at which trade event has occurred

`'amount'`

decimal string

Amount in token denomination for which the trade has occurred for.

`'side'`

string

`"open_long" "open_short" "close_long" "close_short"`

`'cause'`

string

`"normal"` regular user-initiated trading `"market_liquidation"` position was liquidated due to insufficient margin `"backstop_liquidation"` position was liquidated by backstop mechanism `"settlement"` position was closed due to Auto-Deleveraging (ADL) or other settlement

`'created_at'`

integer

Timestamp in milliseconds of trade event

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
    "/api/v1/trades?symbol=BTC",
    headers={"Accept": "*/*"},
)

data = response.json()
```

[PreviousGet orderbook](/api-documentation/api/rest-api/markets/get-orderbook)[NextGet historical funding](/api-documentation/api/rest-api/markets/get-historical-funding)

Last updated 6 months ago