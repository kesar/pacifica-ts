<!-- Source: https://docs.pacifica.fi/api-documentation/api/websocket/subscriptions/account-trades -->

Refer to [Websocket](/api-documentation/api/websocket) for establishing the websocket connection.

### 

[](#params)

Params

Copy

```
{
    "method": "subscribe",
    "params": {
        "source": "account_trades",
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
  "channel": "account_trades",
  "data": [
    {
      "I": null,
      "a": "7.8",
      "f": "0.00501618",
      "h": 9020975,
      "i": 484871,
      "n": "-0.00501618",
      "o": "3.215567",
      "p": "3.2155",
      "s": "SUI",
      "t": 1749053764375,
      "tc": "normal",
      "te": "fulfill_maker",
      "ts": "open_long",
      "u": "42trU9A5..."
    },
    // ... other trades
  ]
}
```

Field

Type

Description

`'I'`

Full UUID string

Client order ID

`'h'`

integer

History ID

`'i'`

integer

Order ID

`'s'`

string

Symbol

`'ts'`

string

Trade side

`'p'`

decimal string

Price

`'a'`

decimal string

Trade amount

`'u'`

sting

Account address

`'t'`

number

Timestamp in milliseconds

`'o'`

decimal string

Entry price

`'te'`

string

`'fulfill_maker'` - provided liquidity `'fulfill_taker'` - took liquidity

`'tc'`

string

`'normal'` - Regular trade `'market_liquidation'` - liquidated by market order `'backstop_liquidation'` - liquidated by backstop liquidator `'settlement'` - ADL/settlement

`'n'`

decimal string

PnL

`'f'`

decimal string

Trade fee

[PreviousAccount order updates](/api-documentation/api/websocket/subscriptions/account-order-updates)[NextTrading operations](/api-documentation/api/websocket/trading-operations)

Last updated 2 months ago