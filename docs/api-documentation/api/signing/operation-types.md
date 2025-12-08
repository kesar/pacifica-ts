<!-- Source: https://docs.pacifica.fi/api-documentation/api/signing/operation-types -->

Operation Type

API Endpoint

`"create_order"`

`/api/v1/orders/create`

`"create_stop_order"`

`/api/v1/orders/stop/create`

`"cancel_order"`

`/api/v1/orders/cancel`

`"cancel_all_orders"`

`/api/v1/orders/cancel_all`

`"cancel_stop_order"`

`/api/v1/orders/stop/cancel`

`"update_leverage"`

`/api/v1/account/leverage`

`"update_margin_mode"`

`/api/v1/account/margin`

`"set_position_tpsl"`

`/api/v1/positions/tpsl`

`"withdraw"`

`/api/v1/account/withdraw`

`"subaccount_initiate"`

`/api/v1/account/subaccount/create`

`"subaccount_confirm"`

`/api/v1/account/subaccount/create`

`"create_market_order"`

`/api/v1/orders/create_market`

`"subaccount_transfer"`

`/api/v1/account/subaccount/transfer`

`"bind_agent_wallet"`

`/api/v1/agent/bind`

`"create_api_key"`

`/api/v1/account/api_keys/create`

`"revoke_api_key"`

`/api/v1/account/api_keys/revoke`

`"list_api_keys"`

`/api/v1/account/api_keys`

Note: Pacifica's batch order endpoint does NOT have a corresponding operation type as all individual operations within the batch are signed independently with their own operation types.

[PreviousImplementation](/api-documentation/api/signing/implementation)[NextError Handling](/api-documentation/api/signing/error-handling)

Last updated 2 months ago