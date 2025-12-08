<!-- Source: https://docs.pacifica.fi/api-documentation/api/websocket/subscriptions/mark-price-candle -->

Refer to [Websocket](/api-documentation/api/websocket) for establishing the websocket connection.

### 

[](#params)

Params

Copy

```
{
  "method": "subscribe",
  "params": {
    "source": "mark_price_candle",
    "symbol": "BTC",
    "interval": "1m"
  }
}
```

Where `"interval"` can be `1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 8h, 12h, 1d`

### 

[](#stream)

Stream

Copy

```
{
  "channel": "mark_price_candle",
  "data": {
    "t": 1748954160000,
    "T": 1748954220000,
    "s": "BTC",
    "i": "1m",
    "o": "105376.500000",
    "c": "105380.250000",
    "h": "105385.750000",
    "l": "105372.000000",
    "v": "0",
    "n": 0
  }
}
```

Field

Type

Description

`'t'`

number

Start time (milliseconds)

`'T'`

number

End time (milliseconds)

`'s'`

string

Symbol

`'i'`

string

Candle interval

`'o'`

decimal string

Open mark price

`'c'`

decimal string

Close mark price

`'h'`

decimal string

High mark price

`'l'`

decimal string

Low mark price

`'v'`

decimal string

Volume (always `"0"`)

`'n'`

number

Number of trades in this period

[PreviousCandle](/api-documentation/api/websocket/subscriptions/candle)[NextAccount margin](/api-documentation/api/websocket/subscriptions/account-margin)

Last updated 8 days ago