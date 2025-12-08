<!-- Source: https://docs.pacifica.fi/api-documentation/api/rest-api/orders/get-order-history-by-id -->

Copy

```
GET /api/v1/orders/history_by_id
```

#### 

[](#query-parameters)

Query Parameters

Field

Type

Need

Description

Example

`"order_id"`

integer

required

Order ID to retrieve history for

`13753364`

Copy

```
/api/v1/orders/history_by_id?order_id=13753364
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
      "history_id": 641452639,
      "order_id": 315992721,
      "client_order_id": "ade1aa6...",
      "symbol": "XPL",
      "side": "ask",
      "price": "1.0865",
      "initial_amount": "984",
      "filled_amount": "0",
      "cancelled_amount": "984",
      "event_type": "cancel",
      "order_type": "limit",
      "order_status": "cancelled",
      "stop_price": null,
      "stop_parent_order_id": null,
      "reduce_only": false,
      "created_at": 1759224895038
    },
    {
      "history_id": 641452513,
      "order_id": 315992721,
      "client_order_id": "ade1aa6...",
      "symbol": "XPL",
      "side": "ask",
      "price": "1.0865",
      "initial_amount": "984",
      "filled_amount": "0",
      "cancelled_amount": "0",
      "event_type": "make",
      "order_type": "limit",
      "order_status": "open",
      "stop_price": null,
      "stop_parent_order_id": null,
      "reduce_only": false,
      "created_at": 1759224893638
    }
  ],
  "error": null,
  "code": null
}
```

Field

Type

Description

`"history_id"`

integer

History ID assigned to the order

`"order_id"`

integer

Order ID assigned to order

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

Amount (in token denomination) of the order placed that was filled

`"cancelled_amount"`

decimal string

Amount (in token denomination) of the order placed that was cancelled

`"event_type"`

decimal string

Make if user was on maker side. Take if on taker.

`"order_type"`

string

`"limit" "market" "stop_limit" "stop_market" "take_profit_limit" "stop_loss_limit" "take_profit_market" "stop_loss_market"`

`"order_status"`

string

`"open" "partially_filled" "filled" "cancelled" "rejected"`

`"stop_price"`

decimal string

Stop price assigned upon order creation for subsequent position if order is filled if specified by user.

`"stop_parent_order_id"`

integer

Order id of stop order attached to original order

`"reduce_only"`

boolean

If the order is reduce only

`"created_at"`

integer

Timestamp in milliseconds when the order was created on Pacifica

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
    "/api/v1/orders/history_by_id?order_id=13753364",
    headers={"Accept": "*/*"},
)

data = response.json()
```

[PreviousGet order history](/api-documentation/api/rest-api/orders/get-order-history)[NextWebsocket](/api-documentation/api/websocket)

Last updated 2 months ago