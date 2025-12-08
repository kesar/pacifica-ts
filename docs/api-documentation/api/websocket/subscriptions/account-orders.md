<!-- Source: https://docs.pacifica.fi/api-documentation/api/websocket/subscriptions/account-orders -->

Refer to [Websocket](/api-documentation/api/websocket) for establishing the websocket connection.

### 

[](#params)

Params

Copy

```
{
    "method": "subscribe",
    "params": {
        "source": "account_orders",
        "account": "42trU9A5..."
    }
}
```

### 

[](#stream)

Stream

Copy

```
{
  "channel": "account_orders",
  "data": [
    {
      "I": null,
      "a": "29580",
      "c": "0",
      "d": "bid",
      "f": "0",
      "i": 560509,
      "p": "0.27046",
      "ot": "limit",
      "ro": false,
      "s": "XLM",
      "sp": null,
      "st": null,
      "t": 1749054246822
    },
    // ... other account orders
  ]
}
```

Field

Type

Description

`'I'`

Full UUID string

Client order ID

`'a'`

decimal string

Original amount

`'c'`

decimal string

Cancelled amount

`'d'`

string

Side: \[`bid`, `ask`\]

`'f'`

decimal string

Filled amount

`'p'`

decimal string

Average filled price

`'i'`

integer

Order ID

`'ot'`

string

Order type \[`market`, `limit`\]

`'ro'`

bool

Reduce only

`'s'`

string

Symbol

`'sp'`

string

Stop price

`'st'`

string

Stop type (TP/SL)

`'u'`

base58 encoded address

Account

`'ip'`

decimal string

Initial price

`'oe'`

string

Order event (see below)

`'os'`

string

Order status (see below)

`'t'`

integer

Timestamp (milliseconds)

Field

Value

Description

`'oe'`

`make`

Order placed on book

`stop_created`

Stop order created

`fulfill_market`

User filled by market order

`fulfill_limit`

User filled others limit order

`adjust`

Order modified

`stop_parent_order_filled`

Parent order filled

`stop_triggered`

Stop order activated

`stop_upgrade`

Stop order upgraded

`cancel`

User cancelled

`force_cancel`

Cancelled by system

`expired`

Time expired

`post_only_rejected`

Cannot execute ALO

`self_trade_prevented`

Cannot execute self-trade

`'os'`

`open`

Active on orderbook

`partially_filled`

Partially filled

`filled`

Completely filled

`cancelled`

Cancelled

`rejected`

Rejected

[PreviousAccount positions](/api-documentation/api/websocket/subscriptions/account-positions)[NextAccount order updates](/api-documentation/api/websocket/subscriptions/account-order-updates)

Last updated 2 months ago