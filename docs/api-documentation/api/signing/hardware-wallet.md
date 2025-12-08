<!-- Source: https://docs.pacifica.fi/api-documentation/api/signing/hardware-wallet -->

Pacifica supports hardware wallet signature authentication via Ed25519 [off-chain message signing](https://github.com/solana-labs/solana/blob/master/docs/src/proposals/off-chain-message-signing.md). To use hardware wallet, after constructing the [message bytes](/api-documentation/api/signing/implementation#id-7.-convert-to-bytes-and-generate-signature), prepend it with the `\xffsolana offchain` header together with message length, version information, etc.

Then, in the [signature to send](/api-documentation/api/signing/implementation#id-8.-build-final-request), use `hardware` as the `type` :

Copy

```
...
"signature": {
      "type": "hardware",
      "value": "2V4Y7Mpk...",
},
...
```

For more details, refer to [this example](https://github.com/pacifica-fi/python-sdk/blob/2b5e629eb15d86c1a229df5d1847f5000f113ec9/rest/transfer_subaccount_fund_hardware.py#L27-L47) in the Python SDK.

[PreviousError Handling](/api-documentation/api/signing/error-handling)[NextAPI Agent Keys](/api-documentation/api/signing/api-agent-keys)

Last updated 5 months ago