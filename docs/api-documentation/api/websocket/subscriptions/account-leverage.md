<!-- Source: https://docs.pacifica.fi/api-documentation/api/websocket/subscriptions/account-leverage -->

Refer to [Websocket](/api-documentation/api/websocket) for establishing the websocket connection.

## 

[](#leverage)

Leverage

### 

[](#params)

Params

Copy

```
{
    "method": "subscribe",
    "params": {
        "source": "account_leverage",
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
    "channel": "account_leverage",
    "data": {
        "u": "42trU9A5..."
        "s": "BTC",
        "l": "12",
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

`'s'`

string

Symbol

`'l'`

integer string

New leverage

`'t'`

number

Timestamp in milliseconds

[PreviousAccount margin](/api-documentation/api/websocket/subscriptions/account-margin)[NextAccount info](/api-documentation/api/websocket/subscriptions/account-info)

Last updated 6 months ago