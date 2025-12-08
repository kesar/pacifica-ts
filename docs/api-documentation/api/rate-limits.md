<!-- Source: https://docs.pacifica.fi/api-documentation/api/rate-limits -->

### 

[](#credit-quotas)

Credit Quotas

The API config key system allows Pacifica to provision higher rate limits to verified users, ensuring real traders have adequate resources while protecting against abuse.

Tier

Base Credits/60s

Unidentified IP

125

Valid API Config Key

300

These are base quotas and may be increased based on account reputation.

### 

[](#credit-costs)

Credit Costs

Action

Unidentified IP

API Config Key

Standard request/action

1

1

Order cancellation

0.5

0.5

Heavy GET requests

3–12

1–3

When credits are exhausted, requests return HTTP 429.

### 

[](#websocket-limits)

WebSocket Limits

*   Max 300 concurrent connections per IP
    
*   Max 20 subscriptions per channel per connection
    

### 

[](#checking-your-quota)

Checking Your Quota

> **Note:** All credit values are multiplied by 10 to support fractional costs (e.g., `r=1200` = 120.0 credits).

**REST API** — Response headers:

Copy

```
ratelimit: "credits";r=1200;t=32
ratelimit-policy: "credits";q=1250;w=60
```

**WebSocket** — `rl` field in action responses:

Copy

```
{"rl": {"r": 1200, "q": 1250, "t": 32}}
```

Field

Description

`r`

Remaining credits

`t`

Seconds until refresh

`q`

Total quota per window

`w`

Window size in seconds

[PreviousAPI Agent Keys](/api-documentation/api/signing/api-agent-keys)[NextAPI Config Keys](/api-documentation/api/rate-limits/api-config-keys)

Last updated 8 days ago