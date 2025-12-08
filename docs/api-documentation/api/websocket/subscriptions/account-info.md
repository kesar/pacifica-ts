<!-- Source: https://docs.pacifica.fi/api-documentation/api/websocket/subscriptions/account-info -->

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
        "source": "account_info",
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
    "channel": "account_info",
    "data": {
        "ae": "2000",
        "as": "1500",
        "aw": "1400",
        "b": "2000",
        "f": 1,
        "mu": "500",
        "cm": "400",
        "oc": 10,
        "pb": "0",
        "pc": 2,
        "sc": 2,
        "t": 1234567890
    }
}
```

Field

Type

Description

`'ae'`

string

Account equity

`'as'`

string

Available to spend

`'aw'`

string

Availale to withdraw

`'b'`

string

Account balance

`'f'`

integer

Account fee tier

`'mu'`

string

Total margin used

`'cm'`

string

Maintenance margin required in cross mode

`'oc'`

integer

Orders count

`'pb'`

string

Pending balance

`'pc'`

integer

Positions count

`'sc'`

integer

Stop order count

`'t'`

number

Timestamp in milliseconds

[PreviousAccount leverage](/api-documentation/api/websocket/subscriptions/account-leverage)[NextAccount positions](/api-documentation/api/websocket/subscriptions/account-positions)

Last updated 1 month ago