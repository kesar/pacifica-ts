<!-- Source: https://docs.pacifica.fi/api-documentation/api/websocket/subscriptions/prices -->

Refer to [Websocket](/api-documentation/api/websocket) for establishing the websocket connection.

### 

[](#params)

Params

Copy

```
{
    "method": "subscribe",
    "params": {
        "source": "prices"
    }
}
```

### 

[](#stream)

Stream

Copy

```
{
    "channel": "prices",
    "data": [
        {
            "funding": "0.0000125",
            "mark": "105473",
            "mid": "105476",
            "next_funding": "0.0000125",
            "open_interest": "0.00524",
            "oracle": "105473",
            "symbol": "BTC",
            "timestamp": 1749051612681,
            "volume_24h": "63265.87522",
            "yesterday_price": "955476"
        }
        // ... other symbol prices
    ],
}
```

Field

Type

Description

`'funding'`

decimal string

Funding rate

`'mark'`

decimal string

Mark price

`'timestamp'`

number

Timestamp in milliseconds

`'mid'`

decimal string

Mid price

`'next_funding'`

decimal string

Next funding rate

`'open_interest'`

decimal string

Open interest amount

`'oracle'`

decimal string

Oracle price

`'symbol'`

string

Symbol

`'volume_24h'`

decimal string

24 hour volume in USD

`'yesterday_price'`

decimal string

Previous day price

[PreviousSubscriptions](/api-documentation/api/websocket/subscriptions)[NextOrderbook](/api-documentation/api/websocket/subscriptions/orderbook)

Last updated 6 months ago