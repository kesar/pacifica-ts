<!-- Source: https://docs.pacifica.fi/api-documentation/api/market-symbols -->

For example, `'BTC'` is the expected form in requests, whereas requests with symbol field `'Btc'` or`'btc'` will fail. All markets symbols are capitalized, except for markets with abbreviated numerical prefixes such as `'kBONK'` and `'kPEPE'` , which have the prefix in lower-case. Requests containing symbol fields such as `'KBONK'`, `'kbonk'`, or `'kBonk'` will fail.

[PreviousAPI Config Keys](/api-documentation/api/rate-limits/api-config-keys)[NextTick and lot size](/api-documentation/api/tick-and-lot-size)

Last updated 1 month ago