<!-- Source: https://docs.pacifica.fi/api-documentation/api/websocket/subscriptions/candle -->

Refer to [Websocket](/api-documentation/api/websocket) for establishing the websocket connection.

### 

[](#params)

Params

Copy

```
{
    "method": "subscribe",
    "params": {
        "source": "candle",
        "symbol": "SOL",
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
  "channel": "candle",
  "data": {
    "t": 1749052260000,
    "T": 1749052320000,
    "s": "SOL",
    "i": "1m",
    "o": "157.3",
    "c": "157.32",
    "h": "157.32",
    "l": "157.3",
    "v": "1.22",
    "n": 8
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

Number of trades in this period

[PreviousTrades](/api-documentation/api/websocket/subscriptions/trades)[NextMark price candle](/api-documentation/api/websocket/subscriptions/mark-price-candle)

Last updated 6 months ago