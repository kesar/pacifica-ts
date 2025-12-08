<!-- Source: https://docs.pacifica.fi/api-documentation/api/websocket/trading-operations/batch-order -->

The [Pacifica Python SDK](https://github.com/pacifica-fi/python-sdk/blob/f2385d42e9ae5276ba2ba85505d51db2eefd2715/rest/batch_orders.py) provides a comprehensive example on using this endpoint

### 

[](#request)

Request

Copy

```
{
  "id": "660065de-8f32-46ad-ba1e-83c93d3e3966",
  "params": {
    "batch_orders": {
      "actions": [
        {
          "type": "Create",
          "data": {
            "account": "42trU9A5...",
            "signature": "5UpRZ14Q...",
            "timestamp": 1749190500355,
            "expiry_window": 5000,
            "symbol": "BTC",
            "price": "100000",
            "reduce_only": false,
            "amount": "0.1",
            "side": "bid",
            "tif": "GTC",
            "client_order_id": "57a5efb1-bb96-49a5-8bfd-f25d5f22bc7e"
          }
        },
        {
          "type": "Cancel",
          "data": {
            "account": "42trU9A5...",
            "signature": "4NDFHyTG...",
            "timestamp": 1749190500355,
            "expiry_window": 5000,
            "symbol": "SOL",
            "order_id": 42069
          }
        }
      ]
    }
  }
}
```

Field

Type

Need

Description

Example

`"id"`

Full UUID string

required

Client-defined request ID

660065de-8f32-46ad-ba1e-83c93d3e3966

`"actions"`

array

required

List of order actions to perform Each action has an "type" field and action-specific "data"

See next two rows

`"type"`

string

required

Specifies type of action. This is DIFFERENT to the "type" used in signature headers

`"Create"` `"Cancel"`

(case sensitive)

`"data"`

object

required

Contains signed request payloads of individual `"Create"` or `"Cancel"` actions

See code block below. Messages and corresponding fields are identical to [create](/api-documentation/api/rest-api/orders/create-limit-order) and [cancel](/api-documentation/api/rest-api/orders/cancel-order) requests.

#### 

[](#response)

Response

*   Status 200: Batch operations processed successfully
    

Copy

```
{
  "code": 200,
  "data": {
    "results": [
      {
        "success": true,
        "order_id": 645953,
        "client_order_id": "57a5efb1-bb96-49a5-8bfd-f25d5f22bc7e",
        "symbol": "BTC"
      },
      {
        "success": true,
        "order_id": 645954,
        "symbol": "ETH"
      }
    ]
  },
  "id": "660065de-8f32-46ad-ba1e-83c93d3e3966",
  "t": 1749223025962,
  "type": "batch_orders"
}
```

*   Status 400: Bad request
    

Copy

```
  {
    "error": "Invalid batch operation parameters",
    "code": 400
  }
```

*   Status 500: Internal server error
    

### 

[](#notes-on-batch-ordering)

Notes on Batch Ordering:

#### 

[](#speed-bump-latency-protection)

Speed Bump (Latency Protection)

Batch orders are subject to a conditional randomized 50-100ms delay to protect liquidity providers from adverse selection: Speed bump is applied if the batch contains:

*   Market orders (CreateMarket)
    
*   Limit orders with TIF = GTC or IOC
    

Speed bump is NOT applied if the batch only contains:

*   Add Liquidity Only orders (TIF = ALO)
    
*   Top of Book orders (TIF = TOB)
    
*   Cancel operations
    
*   TP/SL operations
    

#### 

[](#signature-requirements)

Signature Requirements

*   Each action in the batch must be individually signed
    
*   All signatures must be valid for the batch to process
    

#### 

[](#execution-behavior-and-limits)

Execution Behavior and Limits

*   Maximum 10 actions per batch request
    
*   Actions are executed atomically in the order provided
    
*   If one action fails, subsequent actions are still attempted
    

[PreviousEdit order](/api-documentation/api/websocket/trading-operations/edit-order)[NextCancel order](/api-documentation/api/websocket/trading-operations/cancel-order)

Last updated 9 days ago