<!-- Source: https://docs.pacifica.fi/api-documentation/api/websocket/subscriptions/account-order-updates -->

Refer to [Websocket](/api-documentation/api/websocket) for establishing the websocket connection.

### 

[](#params)

Params

Copy

```
{
    "method": "subscribe",
    "params": {
        "source": "account_order_updates",
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
  "channel": "account_order_updates",
  "data": [
    {
      "I": null,
      "a": "91.1",
      "ct": 1749054643721,
      "d": "bid",
      "f": "2.1",
      "i": 622900,
      "ip": "10.979",
      "oe": "fulfill_limit",
      "os": "partially_filled",
      "ot": "limit",
      "p": "10.979",
      "r": false,
      "s": "TRUMP",
      "si": null,
      "sp": null,
      "u": "42trU9A5...",
      "ut": 1749054645220
    },
    // ... other order updates
  ]
}
```

Field

Type

Description

`'i'`

integer

Order ID

`'I'`

Full UUID string

Client order ID

`'u'`

base58 encoded address

Account

`'s'`

string

Symbol

`'d'`

string

Side: \[`bid`, `ask`\]

`'p'`

decimal string

Average filled price

`'ip'`

decimal string

Initial price

`'a'`

decimal string

Original amount

`'f'`

decimal string

Filled amount

`'oe'`

string

Order event (see below)

`'os'`

string

Order status (see below)

`'ot'`

string

Order type (see below)

`'sp'`

string

Stop price

`'si'`

string

Stop parent order ID

`'r'`

bool

Reduce only

`'ut'`

integer

Updated at time (milliseconds)

`'ct'`

integer

Created at time (milliseconds)

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

`'ot'`

`limit`

Limit

`market`

Market

[PreviousAccount orders](/api-documentation/api/websocket/subscriptions/account-orders)[NextAccount trades](/api-documentation/api/websocket/subscriptions/account-trades)

Last updated 2 months ago