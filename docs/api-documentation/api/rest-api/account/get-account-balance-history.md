<!-- Source: https://docs.pacifica.fi/api-documentation/api/rest-api/account/get-account-balance-history -->

Copy

```
GET /api/v1/account/balance/history
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

User's wallet address

`42trU9A5...`

`"limit"`

integer

optional

Maximum number of records to return, defaults to system defined limit

`100`

`"cursor"`

string

optional

Cursor pagination to access records. Default to none

`1115hVka`

Copy

```
/api/v1/account/balance/history?account=42trU9A5...
```

#### 

[](#response)

Response

*   Status 200: Successfully retrieved balance history
    

Copy

```
{
  "success": true,
  "data": [
    {
      "amount": "100.000000",
      "balance": "1200.000000",
      "pending_balance": "0.000000",
      "event_type": "deposit",
      "created_at": 1716200000000
    }
    ...
  ],
  "next_cursor": "11114Lz77",
  "has_more": true
}
```

Field

Type

Description

`'amount'`

decimal string

Amount change to balance after event

`'balance'`

decimal string

Account balance after event

`'pending_balance'`

decimal string

Pending balance after event

`'event_type'`

string

Type of balance event (see below)

`'created_at'`

integer

Timestamp in milliseconds of when the balance event occurred

`'next_cursor'`

string

Next cursor for pagination

`'has_more'`

boolean

True if there exists a `'next_cursor'`

Event Type (String)

Description

`'deposit'`

Deposit funds to account

`'deposit_release'`

Release of previously pending deposit

`'withdraw'`

Withdrawal of funds from account

`'trade'`

Trading activity (fees, realized PnL)

`'market_liquidation'`

Liquidation by market orders

`'backstop_liquidation'`

Liquidation by backstop liquidator

`'adl_liquidation'`

Liquidation by auto-deleveraging

`'subaccount_transfer'`

Transfer between subaccounts

`'funding'`

Funding payment

`'payout'`

Payout event (from e.g. affiliate program)

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
    "/api/v1/portfolio?account/balance/history?account=42trU9A5..."
    headers={"Accept": "*/*"},
)

data = response.json()
```

[PreviousGet account equity history](/api-documentation/api/rest-api/account/get-account-equity-history)[NextRequest withdrawal](/api-documentation/api/rest-api/account/request-withdrawal)

Last updated 1 month ago