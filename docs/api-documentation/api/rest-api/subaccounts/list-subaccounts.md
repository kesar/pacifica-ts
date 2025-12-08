<!-- Source: https://docs.pacifica.fi/api-documentation/api/rest-api/subaccounts/list-subaccounts -->

Copy

```
POST /api/v1/account/subaccount/list
```

#### 

[](#request-body)

Request Body

Field

Type

Need

Description

Example

`"account"`

string

required

Main account wallet address

`42trU9A5...`

`"signature"`

string

required

Main account signature

`5j1Vy9Uq...`

`"timestamp"`

integer

required

Current timestamp in milliseconds

`1716200000000`

`"expiry_window"`

integer

optional

Signature expiry in milliseconds

`30000`

Copy

```
{
  "account": "42txU9As...",
  "signature": "5j1Vy9Uq...",
  "timestamp": 1716200000000,
  "expiry_window": 30000
}
```

#### 

[](#response)

Response

*   Status 200: Subaccounts listed successfully
    

Copy

```
{
  "success": true,
  "data": {
    "subaccounts": [
      {
        "address": "69txU9As...",
        "balance": "1000.50",
        "pending_balance": "0.00",
        "fee_level": 1,
        "fee_mode": "auto",
        "use_ltp_for_stop_orders": false,
        "created_at": 1716200000000
      }
    ]
  },
  "error": null,
  "code": null
}
```

Field

Type

Description

`'address'`

string

Current account balance, defined as amount of USD in account before settlement

`'balance'`

decimal string

Subaccount balance in USD

`'pending_balance'`

decimal string

Amount of subaccount balance in pending status (deposit request is successful, waiting on confirmation)

`'fee_level'`

integer

Current fee tier of account, determined by trading volume

`'fee_mode'`

string

`"auto"` by default

`'use_ltp_for_stop_orders'`

boolean

Does this subaccount use last traded price to trigger stop orders?

`'created_at'`

integer

Creation timestamp in milliseconds

*   Status 400: Bad request
    

Copy

```
{
  "success": false,
  "data": null,
  "error": "Invalid signature format",
  "code": null
}
```

*   Status 401: Unauthorized
    

Copy

```
{
  "success": false,
  "data": null,
  "error": "Signature verification failed",
  "code": null
}
```

*   Status 403: Forbidden
    

Copy

```
{
  "success": false,
  "data": null,
  "error": "Account not whitelisted",
  "code": null
}
```

[PreviousCreate subaccount](/api-documentation/api/rest-api/subaccounts/create-subaccount)[NextSubaccount fund transfer](/api-documentation/api/rest-api/subaccounts/subaccount-fund-transfer)

Last updated 1 month ago