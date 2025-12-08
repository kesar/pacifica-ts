<!-- Source: https://docs.pacifica.fi/trading-on-pacifica/contract-specifications -->

Pacifica’s perpetual contracts let you seamlessly trade cryptocurrency assets with leverage, without the need for an expiration date. Understanding the specifications of these contracts is crucial for effective trading, risk management, and maximizing your trading potential.

Below is a summary of Pacifica’s key contract details. You can explore deeper into each specification through dedicated subpages linked below.

### 

[](#pacifica-contract-specifications)

Pacifica Contract Specifications

Specification

Description

Details

Contract

Type of perpetual contract

Linear perpetual

Contract Size

Size per contract

1 unit of underlying spot asset

IMM (Initial Maintenance Margin)

Margin required to open a position

1 / (user-selected leverage), dynamically increased when Open Interest sharply rises relative to liquidity

MM

Maintenance Margin

50% of initial margin fraction

Dynamic Margin Adjustment

Margin requirement adjustments

Yes (triggered by sharp increase in open interest vs. exchange liquidity, super-linear scaling of initial margin)

Oracle Price

Price used for liquidation & PnL

Oracle-based (see Oracle Price)

Delivery / Expiration

Contract expiry

None (continuous with hourly funding payments)

Position Limit

Maximum allowed position size

No explicit limit per user (position size managed by dynamic margining)

Account Type

Margin management style

Per-wallet cross or isolated margin

Funding Impact Notional

Notional size impacting funding rates

20,000 USDC (BTC, ETH) 6,000 USDC (other assets)

Maximum Market Order Value

Largest allowed market order

$4M (leverage >=50), $1M (leverage 20-50),$500k (leverage 10-20), otherwise $250k

Maximum Limit Order Value

Largest allowed limit order

10x— maximum market order value

### 

[](#detailed-contract-information)

Detailed Contract Information

Explore further details for each area:

*   Trading Pairs: View all available perpetual markets.
    
*   [Oracle Price](/trading-on-pacifica/contract-specifications/oracle-price-and-mark-price): Understand how Pacifica calculates the oracle-based Mark Price.
    

* * *

Use this overview as your quick-reference guide, and dive deeper into each subpage for full explanations.

[PreviousOverview](/trading-on-pacifica/overview)[NextOracle Price & Mark Price](/trading-on-pacifica/contract-specifications/oracle-price-and-mark-price)

Last updated 2 months ago