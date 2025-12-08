<!-- Source: https://docs.pacifica.fi/api-documentation/api/rest-api/subaccounts/create-subaccount -->

The subaccount creation process follows the below steps.

1.  The main account must authorize the creation of a subaccount under its control
    
2.  The subaccount must consent to being controlled by the main account
    
3.  The API server must verify both signatures to prevent unauthorized subaccount creation
    

Valid addresses must be used in order to establish main/subaccount relationships via API:

*   Neither account can be a subaccount of another account.
    
*   The subaccount address needs to be whitelisted (have entered an access code)
    
*   The subaccount address cannot have any deposit/trade history
    

Please refer to the [Python SDK](https://github.com/pacifica-fi/python-sdk/blob/f2385d42e9ae5276ba2ba85505d51db2eefd2715/rest/create_subaccount.py) for a comprehensive guide on subaccount creation via API

Copy

```
POST /api/v1/account/subaccount/create
```

#### 

[](#request-body)

Request Body

Field

Type

Need

Description

Example

`"main_account"`

string

required

Main account wallet address

`42trU9A5...`

`"subaccount"`

string

required

Subaccount wallet address

`69trU9A5...`

`"timestamp"`

integer

required

Current timestamp in milliseconds

`1716200000000`

`"main_signature"`

string

required

Main account signature

`5j1Vy9Uq...`

`"sub_signature"`

string

required

Subaccount signature

`4k2Wx8Zq...`

`"expiry_window"`

integer

optional

Signature expiry in milliseconds

`30000`

Copy

```
{
  "main_account": "42trU9A5...",
  "subaccount": "69trU9A5...",
  "main_signature": "5j1Vy9Uq...",
  "sub_signature": "4k2Wx8Zq...",
  "timestamp": 1716200000000,
  "expiry_window": 30000
}
```

#### 

[](#response)

Response

*   Status 200: Subaccount created successfully
    

Copy

```
{
  "success": true,
  "data": null,
  "error": null,
  "code": null,
}
```

*   Status 400: Bad request
    

Copy

```
{
  "success": false,
  "data": null,
  "error": "Account already exists: CRTxBM...",
  "code": 2
}
```

*   Status 500: Internal server error
    

[PreviousSubaccounts](/api-documentation/api/rest-api/subaccounts)[NextList subaccounts](/api-documentation/api/rest-api/subaccounts/list-subaccounts)

Last updated 1 month ago