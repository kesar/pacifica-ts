<!-- Source: https://docs.pacifica.fi/api-documentation/api/rest-api/markets/get-kline-candle-data -->

Copy

```
/api/v1/kline
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

`"interval"`

string

required

Candlestick interval Valid values: 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 8h, 12h, 1d

`1m`

`"start_time"`

integer

required

Start time in milliseconds

`1716200000000`

`"end_time"`

integer

optional

End time in milliseconds, defaults to current time if not provided

`1742243220000`

Copy

```
/api/v1/kline?symbol=BTC&interval=1m&start_time=1742243160000&end_time=1742243220000
```

#### 

[](#response)

Response

*   Status 200: Successfully retrieved candle data
    

Copy

```
{
  "success": true,
  "data": [
    {
      "t": 1748954160000,
      "T": 1748954220000,
      "s": "BTC",
      "i": "1m",
      "o": "105376",
      "c": "105376",
      "h": "105376",
      "l": "105376",
      "v": "0.00022",
      "n": 2
    }
  ],
  "error": null,
  "code": null
}
```

Field

Type

Description

`'t'`

number

Candle start time

`'T'`

number

Candle end time

`'s'`

string

Symbol

`'i'`

string

Time interval of candles

`'o'`

decimal string

Open price

`'c'`

decimal string

Close price

`'h'`

decimal string

High price

`'l'`

decimal string

Low price

`'v'`

decimal string

Volume

`'n'`

number

Number of trades on Pacifica for specified symbol

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
    "/api/v1/kline?symbol=BTC&interval=1m&start_time=1742243160000&end_time=1742243220000",
    headers={"Accept": "*/*"},
)

data = response.json()
```

[PreviousGet prices](/api-documentation/api/rest-api/markets/get-prices)[NextGet mark price candle data](/api-documentation/api/rest-api/markets/get-mark-price-candle-data)

Last updated 9 days ago