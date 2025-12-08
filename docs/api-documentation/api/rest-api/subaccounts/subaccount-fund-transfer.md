<!-- Source: https://docs.pacifica.fi/api-documentation/api/rest-api/subaccounts/subaccount-fund-transfer -->

Please refer to the [Python SDK](https://github.com/pacifica-fi/python-sdk/blob/main/rest/transfer_subaccount_fund.py) for a comprehensive guide on subaccount fund transfer via API

Copy

```
POST /api/v1/account/subaccount/transfer
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

Sender account address

`42trU9A5...`

`"signature"`

string

required

Sender account signature

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

`"to_account"`

string

required

Recipient wallet address

`69trU9A5...`

`"amount"`

decimal string

required

Transfer amount (in USDC)

`420.69`

Copy

```
{
  "account": "AwX6321...",
  "signature": "65L9qPp...",
  "timestamp": 1749228826313,
  "expiry_window": 5000,
  "to_account": "CRTxBM...",
  "amount": "420.69"
}
```

#### 

[](#response)

Response

*   Status 200: Subaccount created successfully
    

Copy

```
Status Code: 200
{
  "success": true,
  "data": {
    "success": true,
    "error": null
  },
  "error": null,
  "code": null
}
```

*   Status 400: Bad request
    

Copy

```
Status Code: 400
{
  "success": false,
  "data": null,
  "error": "Insufficient balance for AwX6321: 420.69 (account value: 336.9100000000000000000000)",
  "code": 5
}
```

*   Status 500: Internal server error
    

[PreviousList subaccounts](/api-documentation/api/rest-api/subaccounts/list-subaccounts)[NextOrders](/api-documentation/api/rest-api/orders)

Last updated 5 months ago