<!-- Source: https://docs.pacifica.fi/api-documentation/api/websocket/subscriptions/account-margin -->

Refer to [Websocket](/api-documentation/api/websocket) for establishing the websocket connection.

## 

[](#margin)

Margin

### 

[](#params)

Params

Copy

```
{
    "method": "subscribe",
    "params": {
        "source": "account_margin",
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
    "channel": "account_margin",
    "data": {
        "u": "42trU9A5...",
        "s": "ETH",
        "i": true,
        "t": 1234567890
    }
}
```

Field

Type

Description

`'u'`

string

Account address

`'t'`

number

Timestamp in milliseconds

`'s'`

string

Symbol

`'i'`

boolean

New margin mode (isolated or not isolated)

[PreviousMark price candle](/api-documentation/api/websocket/subscriptions/mark-price-candle)[NextAccount leverage](/api-documentation/api/websocket/subscriptions/account-leverage)

Last updated 6 months ago