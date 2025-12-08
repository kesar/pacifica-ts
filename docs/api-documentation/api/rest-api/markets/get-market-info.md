<!-- Source: https://docs.pacifica.fi/api-documentation/api/rest-api/markets/get-market-info -->

Copy

```
GET /api/v1/info
```

#### 

[](#response)

Response

*   Status 200: Success
    

Copy

```
{
  "success": true,
  "data": [
    {
      "symbol": "ETH",
      "tick_size": "0.1",
      "min_tick": "0",
      "max_tick": "1000000",
      "lot_size": "0.0001",
      "max_leverage": 50,
      "isolated_only": false,
      "min_order_size": "10",
      "max_order_size": "5000000",
      "funding_rate": "0.0000125",
      "next_funding_rate": "0.0000125",
      "created_at": 1748881333944
    },
    {
      "symbol": "BTC",
      "tick_size": "1",
      "min_tick": "0",
      "max_tick": "1000000",
      "lot_size": "0.00001",
      "max_leverage": 50,
      "isolated_only": false,
      "min_order_size": "10",
      "max_order_size": "5000000",
      "funding_rate": "0.0000125",
      "next_funding_rate": "0.0000125",
      "created_at": 1748881333944
    },
    ....
  ],
  "error": null,
  "code": null
}
```

Field

Type

Description

`"symbol"`

string

Trading pair symbol

`"tick_size"`

decimal string

Tick size. All prices are denominated as a multiple of this.

`"min_tick"`

decimal string

Minimum tick. API submitted price cannot be below this value

`"max_tick"`

decimal string

Maximum tick. API submitted price cannot be above this value

`"lot_size"`

decimal string

Lot size. All order sizes (token denominated) are denominated as a multiple of this.

`"max_leverage"`

integer

Maximum leverage allowed on this symbol when opening positions

`"isolated_only"`

boolean

If the market is set to only allow isolated positions

`"min_order_size"`

decimal string

Minimum order size (denominated in USD)

`"max_order_size"`

decimal string

Maximum order size (denominated in USD)

`"funding_rate"`

decimal string

Funding rate paid in the past funding epoch (hour)

`"next_funding_rate"`

decimal string

Estimated funding rate to be paid in the next funding epoch (hour)

`"created_at"`

ISO 8601 string

Timestamp when the market was listed on Pacifica. Markets are returned oldest first.

*   Status 500: Internal server error
    

#### 

[](#code-example-python)

Code Example (Python)

Copy

```
import requests

response = requests.get(
    "/api/v1/info",
    headers={"Accept": "*/*"},
)

data = response.json()
```

[PreviousMarkets](/api-documentation/api/rest-api/markets)[NextGet prices](/api-documentation/api/rest-api/markets/get-prices)

Last updated 8 days ago