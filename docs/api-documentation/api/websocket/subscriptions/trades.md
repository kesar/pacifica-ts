<!-- Source: https://docs.pacifica.fi/api-documentation/api/websocket/subscriptions/trades -->

Refer to [Websocket](/api-documentation/api/websocket) for establishing the websocket connection.

### 

[](#params)

Params

Copy

```
{
    "method": "subscribe",
    "params": {
        "source": "trades",
        "symbol": "SOL"
    }
}
```

### 

[](#stream)

Stream

Copy

```
{
  "channel": "trades",
  "data": [
      {
        "h": 29369352,
        "a": "0.16",
        "d": "open_long",
        "p": "157.43",
        "s": "SOL",
        "t": 1749052438829,
        "tc": "normal",
        "u": "C1obSQwr..."
      },
       // ... other trades
  ]
}
```

Field

Type

Description

`'h'`

integer

History ID

`'a'`

decimal string

Amount

`'d'`

string

Trade side

`open_long`

`open_short`

`close_long`

`close_short`

`'p'`

decimal string

Price

`'s'`

string

Symbol

`'t'`

number

Timestamp in milliseconds

`'tc'`

string

Trade cause

`normal` `market_liquidation` `backstop_liquidation` `settlement`

`'u'`

string

Account address

[PreviousBest bid offer (BBO)](/api-documentation/api/websocket/subscriptions/best-bid-offer-bbo)[NextCandle](/api-documentation/api/websocket/subscriptions/candle)

Last updated 1 month ago