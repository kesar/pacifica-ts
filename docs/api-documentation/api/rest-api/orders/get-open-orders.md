<!-- Source: https://docs.pacifica.fi/api-documentation/api/rest-api/orders/get-open-orders -->

Copy

```
GET /api/v1/orders
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

Account address to filter orders

`42trU9A5...`

Copy

```
/api/v1/orders?account=42trU9A5...
```

#### 

[](#response)

Response

*   Status 200: Successfully retrieved open orders
    

Copy

```
{
  "success": true,
  "data": [
    {
      "order_id": 315979358,
      "client_order_id": "add9a4b5-c7f7-4124-b57f-86982d86d479",
      "symbol": "ASTER",
      "side": "ask",
      "price": "1.836",
      "initial_amount": "85.33",
      "filled_amount": "0",
      "cancelled_amount": "0",
      "stop_price": null,
      "order_type": "limit",
      "stop_parent_order_id": null,
      "reduce_only": false,
      "created_at": 1759224706737,
      "updated_at": 1759224706737
    }
  ],
  "error": null,
  "code": null
}
```

Field

Type

Description

`"order_id"`

integer

Order id assigned to order

`"client_order_id"`

UUID

CLOID of order if assigned by user

`"symbol"`

string

Trading pair symbol

`"side"`

string

Whether the order is a bid or an ask

`"price"`

decimal string

Price set by the order

`"initial_amount"`

decimal string

Amount (in token denomination) of the order placed

`"filled_amount"`

decimal string

Amount (in token denomination) of the order placed that has been filled

`"cancelled_amount"`

decimal string

Amount (in token denomination) of the order placed that has been cancelled

`"stop_price"`

decimal string

Stop price assigned upon order creation for subsequent position if order is filled if specified by user.

`"order_type"`

string

`"limit" "market" "stop_limit" "stop_market" "take_profit_limit" "stop_loss_limit" "take_profit_market" "stop_loss_market"`

`"stop_parent_order_id"`

integer

Order id of stop order attached to original order

`"reduce_only"`

boolean

If the order is reduce only

`"created_at"`

integer

Timestamp in milliseconds when the order was created on Pacifica

`"updated_at"`

integer

Timestamp in milliseconds when the order was last modified (by a fill)

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
    "/api/v1/orders?account=42trU9A5...",
    headers={"Accept": "*/*"},
)

data = response.json()
```

[PreviousBatch order](/api-documentation/api/rest-api/orders/batch-order)[NextGet order history](/api-documentation/api/rest-api/orders/get-order-history)

Last updated 2 months ago