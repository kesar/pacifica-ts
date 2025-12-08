<!-- Source: https://docs.pacifica.fi/trading-on-pacifica/contract-specifications/oracle-price-and-mark-price -->

Pacifica’s perpetual contracts use a decentralized Oracle Price to accurately value positions and determine funding rate and is a component of Mark Price. This Oracle Price protects traders by reducing manipulation risks and ensuring market stability. Mark Price is used for liquidations, margin requirements and Unrealized PnL.

### 

[](#oracle-price-calculation)

Oracle Price Calculation

The oracle price is updated every 3 seconds and calculated as a weighted average of prices from major exchanges.

CEX

Weights

Binance

2

OKX

1

Bybit

1

Hyperliquid

1

### 

[](#uses-of-oracle-price-on-pacifica)

Uses of Oracle Price on Pacifica

The Oracle Price is crucial for several Pacifica exchange operations:

*   Funding Rates: Calculations rely on the Oracle Price to maintain alignment with spot markets.
    
*   Mark Price Calculation: Oracle price serves as a component of Mark Price to prevent market manipulation and ensure the accuracy of settlements.
    

### 

[](#uses-of-mark-price-on-pacifica)

Uses of Mark Price on Pacifica

The Mark Price is the median value of: 1. Oracle (spot) price 2. The median of best bid, best ask, and last trade on Pacifica 3. Perpetual price from major exchanges

The Mark Price is used for:

*   Liquidation Calculations: By using the median value of the 3 Mark Price components, Pacifica ensures fair and accurate liquidations.
    
*   Margin Requirements: Both initial and maintenance margins are determined using the Mark Price.
    
*   Unrealized PnL: Open positions are marked-to-market using the Mark Price.
    

### 

[](#transparency-and-reliability)

Transparency & Reliability

Pacifica provides transparent and verifiable Oracle Prices available directly through our trading interface or via API endpoints, ensuring trust and accountability.

* * *

For further details or technical questions, refer to our [API documentation](/api-documentation/api) or contact our support via [Contact Us](/other/contact-us).

[PreviousContract Specifications](/trading-on-pacifica/contract-specifications)[NextOrder Types](/trading-on-pacifica/order-types)

Last updated 2 months ago