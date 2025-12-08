<!-- Source: https://docs.pacifica.fi/api-documentation/api/websocket/subscriptions/orderbook -->

Refer to [Websocket](/api-documentation/api/websocket) for establishing the websocket connection.

### 

[](#params)

Params

Copy

```
{
    "method": "subscribe",
    "params": {
        "source": "book",
        "symbol": "SOL",
        "agg_level": 1  // Aggregation level
    }
}
```

where `agg_level`can be one of `1, 2, 5, 10, 100, 1000`.

### 

[](#stream)

Stream

Copy

```
{
  "channel": "book",
  "data": {
    "l": [
      [
        {
          "a": "37.86",
          "n": 4,
          "p": "157.47"
        },
        // ... other aggegated bid levels
      ],
      [
        {
          "a": "12.7",
          "n": 2,
          "p": "157.49"
        },
        {
          "a": "44.45",
          "n": 3,
          "p": "157.5"
        },
        // ... other aggregated ask levels
      ]
    ],
    "s": "SOL",
    "t": 1749051881187
  }
}
```

The `book` websocket stream updates once every 100ms

Field

Type

Description

`'l'`

array

\[Bids, Asks\]

`'a'`

decimal string

Total amount in aggregation level.

`'n'`

integer

Number of orders in aggregation level.

`'p'`

decimal string

*   In bids array, this is highest price in aggregation level.
    
*   In asks array, this is lowest price is aggregation level
    

`'s'`

string

Symbol

`'t'`

number

Timestamp in milliseconds

[PreviousPrices](/api-documentation/api/websocket/subscriptions/prices)[NextBest bid offer (BBO)](/api-documentation/api/websocket/subscriptions/best-bid-offer-bbo)

Last updated 1 month ago