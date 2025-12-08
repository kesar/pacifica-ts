<!-- Source: https://docs.pacifica.fi/api-documentation/api/rest-api/account/get-account-info -->

Copy

```
GET /api/v1/account
```

#### 

[](#query-parameters)

Query Parameters

Field

Type

Need

Description

Example

`"account"`

string

required

Account address

`42trU9A5...`

Copy

```
/api/v1/account?account=42trU9A5...
```

#### 

[](#response)

Response

*   Status 200: Successfully retrieved account information
    

Copy

```
{
  "success": true,
  "data": [{
    "balance": "2000.000000",
    "fee_level": 0,
    "account_equity": "2150.250000",
    "available_to_spend": "1800.750000",
    "available_to_withdraw": "1500.850000",
    "pending_balance": "0.000000",
    "total_margin_used": "349.500000",
    "cross_mmr": "420.690000",
    "positions_count": 2,
    "orders_count": 3,
    "stop_orders_count": 1,
    "updated_at": 1716200000000,
    "use_ltp_for_stop_orders": false
  }
],
  "error": null,
  "code": null
}
```

Field

Type

Description

`'balance'`

decimal string

Current account balance, defined as amount of USD in account before settlement

`'fee_level'`

integer

Current fee tier of account, determined by trading volume

`'account_equity'`

decimal string

Account balance + unrealized PnL

`'available_to_spend'`

decimal string

Amount of account equity that is available to used to margin for open positions and orders

`'available_to_withdraw'`

decimal string

Amount that is available to withdraw out from the exchange

`'pending_balance'`

decimal string

Amount of account balance in pending status (deposit request is successful, waiting on confirmation)

`'total_margin_used'`

decimal string

Amount of account equity currently being used to margin for open positions and orders

`'cross_mmr'`

decimal string

The maintenance margin required under the cross mode

`'positions_count'`

integer

Number of open positions (isolated and cross)

`'orders_count'`

integer

Number of open orders across all markets (excludes stop orders)

`'stop_orders_count'`

integer

Number of open stop orders across markets

`'updated_at'`

integer

Timestamp in milliseconds of last account info update

`'use_ltp_for_stop_orders'`

boolean

If the account uses last traded price to trigger stop orders

*   Status 400: Invalid request parameters
    
*   Status 401: Unauthorized access
    
*   Status 500: Internal server error
    

#### 

[](#code-example-python)

Code Example (Python)

Copy

```
import requests

response = requests.get(
    "/api/v1/account?account=42trU9A5...",
    headers={"Accept": "*/*"},
)

data = response.json()
```

[PreviousAccount](/api-documentation/api/rest-api/account)[NextGet account settings](/api-documentation/api/rest-api/account/get-account-settings)

Last updated 1 month ago