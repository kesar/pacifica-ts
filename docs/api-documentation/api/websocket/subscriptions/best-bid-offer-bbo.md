<!-- Source: https://docs.pacifica.fi/api-documentation/api/websocket/subscriptions/best-bid-offer-bbo -->

Refer to [Websocket](/api-documentation/api/websocket) for establishing the websocket connection.

### 

[](#params)

Params

Copy

```
{
  "method": "subscribe",
  "params": {
    "source": "bbo",
    "symbol": "BTC"
  }
}
```

### 

[](#stream)

Stream

Copy

```
{
  "channel": "bbo",
  "data": {
    "s": "BTC",
    "i": 1234567890,
    "t": 1764133203991,
    "b": "87185",
    "B": "1.234",
    "a": "87186",
    "A": "0.567"
  }
}
```

Field

Type

Description

`'s'`

string

Symbol

`'i'`

integer

Order id

`'t'`

integer

Timestamp in milliseconds

`'b'`

decimal string

Best bid price

`'B'`

decimal string

Best bid amount (in token amount)

`'a'`

decimal string

Best ask price

`'A'`

decimal string

Best ask amount (in token amount)

[PreviousOrderbook](/api-documentation/api/websocket/subscriptions/orderbook)[NextTrades](/api-documentation/api/websocket/subscriptions/trades)

Last updated 8 days ago