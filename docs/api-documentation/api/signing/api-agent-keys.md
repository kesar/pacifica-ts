<!-- Source: https://docs.pacifica.fi/api-documentation/api/signing/api-agent-keys -->

The signature verification process in both REST API and Websocket allow user generated API Agent Keys (also called "Agent Wallets") to sign on behalf of the original account. This is similar to the API Keys used for most leading exchanges. This way, API users can trade programmably without exposing the private key of the original wallet to the trading program.

### 

[](#generate-api-agent-keys)

Generate API Agent Keys

Agent wallets can be generated on the [frontend](https://app.pacifica.fi/apikey), or using this [Python SDK example](https://github.com/pacifica-fi/python-sdk/blob/main/rest/api_agent_keys.py#L31-L79).

### 

[](#use-api-agent-keys)

Use API Agent Keys

For all POST requests, follow these steps in request construction

*   Still use the original wallet's public key for `account`,
    
*   Use API Agent Private Key to sign the message payload to generate `signature`, and
    
*   Add `agent_wallet: [AGENT_WALLET_PUBLIC_KEY]` to the request header.
    

As an example, this [Python SDK program](https://github.com/pacifica-fi/python-sdk/blob/main/rest/api_agent_keys.py#L81-L135) uses API Agent Key to place a market order.

[PreviousHardware Wallet](/api-documentation/api/signing/hardware-wallet)[NextRate limits](/api-documentation/api/rate-limits)

Last updated 2 months ago