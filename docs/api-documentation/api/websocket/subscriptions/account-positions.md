<!-- Source: https://docs.pacifica.fi/api-documentation/api/websocket/subscriptions/account-positions -->

Refer to [Websocket](/api-documentation/api/websocket) for establishing the websocket connection.

### 

[](#params)

Params

Copy

```
{
    "method": "subscribe",
    "params": {
        "source": "account_positions",
        "account": "42trU9A5..."
    }
}
```

### 

[](#initialization-snapshot)

Initialization Snapshot

Upon subscription, the `account positions` websocket immediately returns a snapshot of all current positions, then begins streams all changes made to an account's positions.

### 

[](#stream)

Stream

Copy

```
{
  "channel": "subscribe",
  "data": {
    "source": "account_positions",
    "account": "BrZp5..."
  }
}
// this is the initialization snapshot
{
  "channel": "account_positions", 
  "data": [
    {
      "s": "BTC",
      "d": "bid",
      "a": "0.00022",
      "p": "87185",
      "m": "0",
      "f": "-0.00023989",
      "i": false,
      "l": null,
      "t": 1764133203991
    }
  ]
}
// this shows the position being increased by an order filling
{
  "channel": "account_positions",
  "data": [
    {
      "s": "BTC",
      "d": "bid",
      "a": "0.00044",
      "p": "87285.5",
      "m": "0",
      "f": "-0.00023989",
      "i": false,
      "l": "-95166.79231",
      "t": 1764133656974
    }
  ]
}
// this shows the position being closed
{
  "channel": "account_positions",
  "data": []
}
```

Field

Type

Description

`'s'`

string

Symbol

`'d'`

string

Position side (bid, ask)

`'a'`

decimal string

Position amount

`'p'`

decimal string

Average entry price

`'m'`

decimal string

Position margin

`'f'`

decimal string

Position funding fee

`'i'`

bool

Is position isolated?

`'l'`

decimal string

Liquidation price in USD (null if not applicable)

`'t'`

number

Timestamp in milliseconds

[PreviousAccount info](/api-documentation/api/websocket/subscriptions/account-info)[NextAccount orders](/api-documentation/api/websocket/subscriptions/account-orders)

Last updated 8 days ago