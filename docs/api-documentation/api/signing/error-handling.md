<!-- Source: https://docs.pacifica.fi/api-documentation/api/signing/error-handling -->

Error Message

Potential Causes

`"Invalid signature"`

*   Invalid signature format (not valid base58)
    
*   Signature bytes don't form a valid Ed25519 signature
    
*   Malformed signature data
    

`"Invalid message"`

*   Message has expired (timestamp + expiry\_window < current time)
    
*   Message cannot be serialized to JSON
    
*   Message structure is malformed
    

`"Invalid public key"`

*   Account address doesn't represent a valid Ed25519 public key
    
*   Public key bytes are malformed
    

`"Verification failed"`

*   Signature doesn't match the message content
    
*   Wrong private key was used to sign
    
*   Message content was modified after signing
    

While we have provided several different error message types in order to aid debugging, an incorrectly generated signed message is still relatively ambiguous when it comes to troubleshooting the root cause of the issue, making debugging more challenging. As such, the following guide and/or the [Pacifica Python SDK](https://github.com/pacifica-fi/python-sdk), when followed closely, should make signing relatively straightforward to implement.

[PreviousOperation Types](/api-documentation/api/signing/operation-types)[NextHardware Wallet](/api-documentation/api/signing/hardware-wallet)

Last updated 6 months ago