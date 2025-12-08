<!-- Source: https://docs.pacifica.fi/api-documentation/api/rest-api/markets/get-mark-price-candle-data -->

Copy

```
/api/v1/kline/mark
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
/api/v1/kline/mark?symbol=BTC&interval=1m&start_time=1742243160000&end_time=1742243220000
```

#### 

[](#response)

Response

*   Status 200: Successfully retrieved mark price candle data
    

Copy

```
{
  "success": true,
  "data": [
    {
      "t": 1764126720000,
      "T": 1764126780000,
      "s": "BTC",
      "i": "1m",
      "o": "87701",
      "c": "87687.303362",
      "h": "87739",
      "l": "87687.303362",
      "v": "0.84106",
      "n": 62
    },
    {
      "t": 1764126780000,
      "T": 1764126840000,
      "s": "BTC",
      "i": "1m",
      "o": "87684.118667",
      "c": "87654",
      "h": "87684.118667",
      "l": "87645",
      "v": "4.5997",
      "n": 91
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

Volume (always `"0"`)

`'n'`

number

Number of trades on Pacifica in candle duration

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
    "/api/v1/kline/mark?symbol=BTC&interval=1m&start_time=1742243160000&end_time=1742243220000",
    headers={"Accept": "*/*"},
)

data = response.json()
```

[PreviousGet candle data](/api-documentation/api/rest-api/markets/get-candle-data)[NextGet orderbook](/api-documentation/api/rest-api/markets/get-orderbook)

Last updated 8 days ago