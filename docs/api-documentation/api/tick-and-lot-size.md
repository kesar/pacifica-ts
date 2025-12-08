<!-- Source: https://docs.pacifica.fi/api-documentation/api/tick-and-lot-size -->

Both `'price'` and `'amount'` fields in order related API operations are subject to rounding, needing to be multiples tick and lot size. Generally `tick_size` is determined by the rightmost decimal place of a symbol's current price, and prices generally have five significant figures, with the exception of assets with more than six integer places, where sig.figs = #of integer places. For example: If `'price' = 123.45`, expect `'tick_size' = 0.01` If `'price' = 123456`, expect `'tick_size' = 1` Generally, `lot_size*tick_size = 0.0001 or 0.00001`, based on the market. For the exact implemented `tick_size` and `lot_size` of each market, call the [market info](/api-documentation/api/rest-api/markets/get-market-info) endpoint to verify.

## 

[](#rounding)

Rounding

Pacifica accepts requests containing `'price'` and `'amount'` fields only when they are multiples of `tick_size` and `lot_size` respectively. Any requests with incorrectly rounded `'price'` and `'amount'` fields will return `'"Internal server error","code":500'`

For example: BTC has `"tick_size": "1"`, `"lot_size": "0.00001"` A request where `"amount": "0.000005"` will return `Status 500: Internal server error` A request where `"price": "100_000.5"` will return `Status 500: Internal server error`

A request where `"amount": "0.00002"` will be accepted A request where `"price": "100_001"` will be accepted

[PreviousMarket Symbols](/api-documentation/api/market-symbols)[NextError Codes](/api-documentation/api/error-codes)

Last updated 6 months ago