<!-- Source: https://docs.pacifica.fi/api-documentation/changelog -->

### 

[](#id-2025-11-19)

2025-11-19

**REST API**

*   Market info endpoint updated \[UPDATE\]
    
    *   Added `created_at` field to /api/v1/info response showing when each market was listed
        
    

**WEBSOCKET**

*   Account positions snapshot \[UPDATE\]
    
    *   account\_positions websocket endpoint now returns immediate snapshot of current positions upon subscription
        
    
*   Batch orders \[NEW\]
    
    *   Order batching now supported via websocket
        
    
*   Best bid offer (BBO) \[NEW\]
    
    *   bbo endpoint now supported via websocket
        
    *   constantly streams top of book for selected symbol
        
    

**REST API & WS**

*   Edit order type added \[NEW\]
    
    *   Added endpoint in REST and WS to edit price and/or size of existing orders
        
    
*   Mark price candle added \[NEW\]
    
    *   Added endpoint in REST and WS to show mark price candles
        
    *   Returns candle data based on mark price instead of traded prices
        
    
*   Batch order speed bump optimization \[UPDATE\]
    
    *   Speed bump now applied conditionally based on order types in batch
        
    *   Only applied if batch contains market orders or limit orders with TIF GTC/IOC
        
    *   Speed bump not applied if batch only contains ALO/TOB orders, cancellations, or TP/SL updates
        
    

### 

[](#id-2025-11-12)

2025-11-12

**GENERAL API**

*   Taker latency increased. \[UPDATE\]
    
    *   All market orders, TIF GTC, and TIF IOC orders are subject to a ~200ms delay
        
    

### 

[](#id-2025-11-10)

2025-11-10

**REST API & WS**

*   [Top-of-Book (TOB)](/trading-on-pacifica/order-types) TIF order type added \[NEW\]
    
*   Useable in:
    
    *   Frontend GUI under Limit, TIF, TOB (Post Only)
        
    *   [Create limit order REST API](/api-documentation/api/rest-api/orders/create-limit-order) endpoint
        
    *   [Batch order REST API](/api-documentation/api/rest-api/orders/batch-order) endpoint
        
    *   [Create limit order websocket](/api-documentation/api/websocket/trading-operations/create-limit-order) endpoint
        
    

### 

[](#id-2025-11-09)

2025-11-09

**GENERAL API**

*   Taker latency added. \[NEW\]
    
    *   All market orders, TIF GTC, and TIF IOC orders are subject to a randomized 50-100ms delay
        
    

### 

[](#id-2025-10-30)

2025-10-30

**REST API**

*   Cursor based pagination added for all history endpoints \[UPDATE\]
    
    *   Offset pagination deprecated
        
    

### 

[](#id-2025-10-25)

2025-10-25

**REST API**

*   [List subaccounts](/api-documentation/api/rest-api/subaccounts/list-subaccounts) \[NEW\]
    
    *   Added a new endpoint to retrieve subaccount information
        
    

**WEBSOCKET**

*   [Orderbook websocket](/api-documentation/api/websocket/subscriptions/orderbook) \[UPDATE\]
    
    *   'book' websocket update interval improved from 500ms to 100ms
        
    

[PreviousError Codes](/api-documentation/api/error-codes)[NextAudits](/other/audits)

Last updated 8 days ago