<!-- Source: https://docs.pacifica.fi/api-documentation/api/websocket -->

Mainnet websocket URL: [wss://ws.pacifica.fi/ws](wss://ws.pacifica.fi/ws) Testnet websocket URL: [wss://test-ws.pacifica.fi/ws](wss://test-ws.pacifica.fi/ws)

The API service provides a universal endpoint for websocket streams. The subscribed data will be streamed in the corresponding channel after the connection is established.

### 

[](#subscription-message)

Subscription Message

Copy

```
{
    "method": "subscribe",
    "params": { ... }
}
```

### 

[](#unsubscription-message)

Unsubscription Message

Copy

```
{
    "method": "unsubscribe",
    "params": { ... }
}
```

### 

[](#heartbeat-and-timeout)

Heartbeat and Timeout

A webscoket connection will be closed if no message is sent for the past 60 seconds, or the connection has been alive for 24 hours.

To keep the connection alive without messages in 60 seconds, we can send a heartbeat message

Copy

```
{
    "method": "ping"
}
```

and alive connection will respond with

Copy

```
{
    "channel": "pong"
}
```

[PreviousGet order history by ID](/api-documentation/api/rest-api/orders/get-order-history-by-id)[NextSubscriptions](/api-documentation/api/websocket/subscriptions)

Last updated 5 months ago