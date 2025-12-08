<!-- Source: https://docs.pacifica.fi/trading-on-pacifica/order-types -->

The following order types are available on Pacifica:

*   **Market:** An order that executes immediately at the best available market prices. Typically used in order to immediately enter or exit a position.
    
*   **Limit:** An order that specifies the price at which it will be executed. Limit orders can remain active based on different time-in-force settings (see below). Typically used when execution price matters more than being filled immediately
    
*   **Stop Market:** A market order that is placed when a price condition is met. Typically used to take profit or limit losses.
    
*   **Stop Limit:** A limit order that is placed when a price condition is met.
    

**Time-In-Force:** All limit orders on Pacifica belong to one of the following TIF options.

*   **Good-Til-Cancelled (GTC):** The order remains active on the orderbook until it is either filled or cancelled.
    
*   **Immediate-or-Cancel (IOC):** The order attempts to match immediately at the specified price (or better). Any portion of the order that cannot is not filled immediately is cancelled.
    
*   **Add-Liquidity-Only (ALO):** Also known as **“Post Only,”** this order is added to the order-book only if it would does not immediately match against an existing order.
    
*   **Top-of-Book (TOB):** A special order type that allows "ALO (Post Only)" orders which cross the orderbook to be placed at the best bid/ask possible, instead of being cancelled. Best bid refers to lowest ask in orderbook minus one tick. Best ask refers to highest bid in orderbook plus one tick.
    

Note: In order to protect liquidity providers from adverse selection, all market orders, TIF GTC, and TIF IOC orders are subject to a randomized 50-100ms delay.

[PreviousOracle Price & Mark Price](/trading-on-pacifica/contract-specifications/oracle-price-and-mark-price)[NextSelf-trade Prevention](/trading-on-pacifica/self-trade-prevention)

Last updated 24 days ago