<!-- Source: https://docs.pacifica.fi/api-documentation/api/rate-limits/api-config-keys -->

Pacifica offers API Config Key rate limiting on APIs that allows for more flexible limits. For more information around API Config Key limits, please reach out to us in the [Discord API channel](https://discord.com/channels/1325864651816435822/1378723526957334548). API Config Keys are generated via REST API. The Python SDK provides examples for how API Config Key can be generated, listed and revoked: [https://github.com/pacifica-fi/python-sdk/blob/main/rest/api\_config\_keys.py](https://github.com/pacifica-fi/python-sdk/blob/main/rest/api_config_keys.py). Each account can have up to 5 API Config Keys.

Copy

```
POST /api/v1/account/api_keys/create
POST /api/v1/account/api_keys/revoke
POST /api/v1/account/api_keys
```

#### 

[](#request-body)

Request Body:

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

`"signature"`

string

required

Cryptographic signature

`5j1Vy9Uq...`

`"timestamp"`

integer

required

Current timestamp in milliseconds

`1716200000000`

`"expiry_window"`

integer

optional

Signature expiry in milliseconds

`30000`

#### 

[](#response)

Response

Copy

```
{
  "data": {
    "api_key": "AbCdEfGh_2mT8x..."
  }
}
```

Note: API Config Keys are generated with a prefix for fast lookup Format: `"{8_char_prefix}_{base58_encoded_uuid}"`

### 

[](#using-a-pacifica-api-config-key)

Using a Pacifica API Config Key

Pacifica's API Config Keys are used to enhance websocket rate-limiting. The default rate for an API Config Key follows the same restrictions as IP-based rate limits. Pacifica API Config Keys are used in the connection header to specify API Config Key rate limiting. Using the Python SDK as an example,

*   for Websockets, add `extra_headers={"PF-API-KEY": "your_rate_limit_key"}`into `websockets.connect`
    
*   for REST APIs, add `"PF-API-KEY": "your_rate_limit_key"` into `headers` with `{"Content-Type": "application/json"}`
    

[PreviousRate limits](/api-documentation/api/rate-limits)[NextMarket Symbols](/api-documentation/api/market-symbols)

Last updated 2 months ago