<!-- Source: https://docs.pacifica.fi/api-documentation/api/signing/implementation -->

### 

[](#id-1.-setup-and-initialization)

1\. Setup and Initialization:

Copy

```
import time
import base58
import requests
from solders.keypair import Keypair

PRIVATE_KEY = "your_private_key_here"

# Generate keypair from private key
keypair = Keypair.from_bytes(base58.b58decode(PRIVATE_KEY))
public_key = str(keypair.pubkey())
```

### 

[](#id-2.-choose-endpoint-and-define-operation-type)

2\. Choose Endpoint and Define Operation Type

For this example, we use the order creation endpoint. Refer to [Operation Types](https://docs.pacifica.fi/api-documentation/api/signing/operation-types) for a list of all types and corresponding API endpoints.

Copy

```
API_URL = "https://api.pacifica.fi/api/v1/orders/create"
operation_type = "create_order"
operation_data = {
    "symbol": "BTC",
    "price": "100000",
    "amount": "0.1",
    "side": "bid",
    "tif": "GTC",
    "reduce_only": False,
    "client_order_id": str(uuid.uuid4()),
}
```

### 

[](#id-3.-create-signature-header)

3\. Create Signature Header

Note that all times specified are denoted in milliseconds. The `"expiry_window"` field is optional, and defaults to 30\_000 (30 seconds) if not specified in the header.

Copy

```
# Get current timestamp in milliseconds
timestamp = int(time.time() * 1_000)

signature_header = {
    "timestamp": timestamp,
    "expiry_window": 5_000,  
    "type": "create_order",
}
```

### 

[](#id-4.-combine-header-and-payload)

4\. Combine Header and Payload

Copy

```
data_to_sign = {
    **signature_header,
    "data": operation_data,
}
```

In the case of our example, this creates:

Copy

```
 {
     "timestamp": 1748970123456,
     "expiry_window": 5000,
     "type": "create_order",
     "data": {
         "symbol": "BTC",
         "price": "100000",
         "amount": "0.1",
         "side": "bid",
         "tif": "GTC",
         "reduce_only": False,
         "client_order_id": "12345678-1234-1234-1234-123456789abc"
     }
 }
```

Note that data must be in same level as other headers.

### 

[](#id-5.-recursively-sort-json-keys)

5\. Recursively Sort JSON Keys

Copy

```
def sort_json_keys(value):
    if isinstance(value, dict):
        sorted_dict = {}
        for key in sorted(value.keys()):
            sorted_dict[key] = sort_json_keys(value[key])
        return sorted_dict
    elif isinstance(value, list):
        return [sort_json_keys(item) for item in value]
    else:
        return value

sorted_message = sort_json_keys(data_to_sign)
```

In the case of our example, this creates:

Copy

```
{
     "data": {
         "amount": "0.1",
         "client_order_id": "12345678-1234-1234-1234-123456789abc",
         "price": "100000",
         "reduce_only": false,
         "side": "bid",
         "symbol": "BTC",
         "tif": "GTC"
     },
     "expiry_window": 5000,
     "timestamp": 1748970123456,
     "type": "create_order"
 }
```

Note that the recursive sorting alphabetically sorts \*all\* levels

### 

[](#id-6.-create-compact-json)

6\. Create Compact JSON

Compact JSON string with no whitespace and standardized seperators

Copy

```
import json

compact_json = json.dumps(sorted_message, separators=(",", ":"))
```

In the case of our example, this creates:

Copy

```
{"data":{"amount":"0.1","client_order_id":"12345678-1234-1234-1234-123456789abc","price":"100000","reduce_only":false,"side":"bid","symbol":"BTC","tif":"GTC"},"expiry_window":5000,"timestamp":1748970123456,"type":"create_order"}
```

This ensures that all logically identical messages will always produce \*identical\* signatures

### 

[](#id-7.-convert-to-bytes-and-generate-signature)

7\. Convert to Bytes and Generate Signature

Messages are converted to UTF-8 bytes for signing. The signature generated is then converted to Base58 string for transmission.

Copy

```
# Convert to UTF-8 bytes
message_bytes = compact_json.encode("utf-8")

# Sign message bytes using your private key
signature = keypair.sign_message(message_bytes)

# Convert signature to Base58 string
signature_b58 = base58.b58encode(bytes(signature)).decode("ascii")

# Expect an output similar to:
# "5j1Vy9UqYUF2jKD9r2Lv5AoMWHJuW5a1mqVzEhC9SJL5GqbPkGEQKpW3UZmKXr4UWrHMJ5xHQFMJkZWE8J5VyA"
```

### 

[](#id-8.-build-final-request)

8\. Build Final Request

Build the header with generated authentication info and combine with operation data (NOT the "data" wrapper!)

Copy

```
request_header = {
    "account": public_key,
    "agent_wallet": None,
    "signature": signature_b58,
    "timestamp": signature_header["timestamp"],
    "expiry_window": signature_header["expiry_window"],
}

final_request = {
    **request_header,
    **operation_data,  # Use the ORIGINAL create order fields
}
```

In the case of our example, the final request looks like:

Copy

```
 {
     "account": "6ETnufiec2CxVWTS4u5Wiq33Zh5Y3Qm6Pkdpi375fuxP",
     "agent_wallet": null,
     "signature": "5j1Vy9UqYUF2jKD9r2Lv5AoMWHJuW5a1mqVzEhC9SJL5GqbPkGEQKpW3UZmKXr4UWrHMJ",
     "timestamp": 1748970123456,
     "expiry_window": 5000,
     "symbol": "BTC",
     "price": "100000",
     "amount": "0.1",
     "side": "bid",
     "tif": "GTC",
     "reduce_only": false,
     "client_order_id": "12345678-1234-1234-1234-123456789abc"
 }
```

[PreviousSigning](/api-documentation/api/signing)[NextOperation Types](/api-documentation/api/signing/operation-types)

Last updated 2 months ago