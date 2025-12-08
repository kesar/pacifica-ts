<!-- Source: https://docs.pacifica.fi/trading-on-pacifica/funding-rates -->

Funding fees ensure perpetual contract prices closely track the underlying spot market. Depending on the prevailing funding rate, traders with open positions periodically pay or receive these fees:

*   Positive Funding Rate: Traders holding long positions pay traders holding short positions.
    
*   Negative Funding Rate: Traders holding short positions pay traders holding long positions.
    

Funding rates are updated every hour, calculated based on market conditions from the previous hour.

### 

[](#funding-rate-calculation)

Funding Rate Calculation

Pacifica calculates the funding rate using two components: the Premium Index and a fixed 8-hour Interest Rate (0.01%):

Copy

```
funding_rate = (premium_index + clamp(interest_rate - premium_index, -0.05%, 0.05%))/8
```

**Where:**

*   **Premium Index** measures the deviation between the Impact Price and the Oracle Price:
    

Copy

```
premium_index = impact_price / oracle_price - 1
```

*   **Impact Price** is determined by the average execution price for a defined Impact Notional from Pacifica’s orderbook:
    

Copy

```
impact_price = max(impact_bid_price - oracle_price, 0) 
             - max(oracle_price - impact_ask_price, 0)
```

The **Impact Notional** values are:

Asset

Impact Notional (USD)

BTC

$20,000

Other

$6,000

*   **Clamp** of +-0.05% keeps funding static for small fluctuations in premium, allowing for a steady funding rate during relatively steady market conditions
    

Pacifica samples and updates the funding rate every **5 seconds** and displays a TWAP of the estimated next 1h funding rate. At the end of each **1-hour interval**, the average funding rate is taken and then applied to open positions, and the funding rate TWAP is reset.

Funding fees per hour are capped at ±4%. **Funding payments:**

*   Long positions:
    
    *   Positive funding rate: Account Balance reduced (pay fee)
        
    *   Negative funding rate: Account Balance increased (receive fee)
        
    
*   Short positions:
    
    *   Positive funding rate: Account Balance reduced (receive fee)
        
    *   Negative funding rate: Account Balance increased (pay fee)
        
    

### 

[](#effect-on-isolated-positions-and-liquidations)

Effect on Isolated Positions and Liquidations

For isolated margin positions, funding payments are deducted from the isolated margin balance and will therefore affect the position's liquidation price. After each funding payout, Pacifica recalculates liquidation prices to reflect the adjusted margin.

[PreviousMargin & Leverage](/trading-on-pacifica/margin-and-leverage)[NextTrading Fees](/trading-on-pacifica/trading-fees)

Last updated 8 months ago