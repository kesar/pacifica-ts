<!-- Source: https://docs.pacifica.fi/api-documentation/api/rest-api/account/get-account-settings -->

Copy

```
GET /api/v1/account/settings
```

#### 

[](#query-parameters)

Query Parameters

Field

Type

Need

Description

Example

`"account"`

string

required

Account address

`42trU9A5...`

Copy

```
/api/v1/account/settings?account=42trU9A5...
```

#### 

[](#response)

Response

NOTE: Upon account creation, all markets have margin settings default to cross margin and leverage default to max. When querying this endpoint, all markets with default margin and leverage settings on this account will return blank.

*   Status 200: Successfully retrieved account settings
    

Copy

```
  {
  "success": true,
  "data": [
    {
      "symbol": "WLFI",
      "isolated": false,
      "leverage": 5,
      "created_at": 1758085929703,
      "updated_at": 1758086074002
    }
  ],
  "error": null,
  "code": null
}
```

Field

Type

Description

`"symbol"`

string

Trading pair symbol

`"isolated"`

boolean

If the account is set to isolated margining for this symbol

`"leverage"`

integer

Current leverage set by the user (default to max)

`"created_at"`

integer

Timestamp in milliseconds when these settings were adjusted from their default

`"updated_at"`

integer

Timestamp in milliseconds when these settings were last updated

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
    "/api/v1/account/settings?account=42trU9A5...",
    headers={"Accept": "*/*"},
)

data = response.json()
```

[PreviousGet account info](/api-documentation/api/rest-api/account/get-account-info)[NextUpdate leverage](/api-documentation/api/rest-api/account/update-leverage)

Last updated 2 months ago