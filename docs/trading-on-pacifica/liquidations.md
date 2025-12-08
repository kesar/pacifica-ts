<!-- Source: https://docs.pacifica.fi/trading-on-pacifica/liquidations -->

Pacifica employs a robust, three-tiered liquidation process to manage positions that fall below the required maintenance margin. This multi-step approach is designed to minimize market disruption while ensuring that traders’ collateral is used effectively to cover losses.

### 

[](#liquidation-price-formula)

**Liquidation Price Formula:**

Liquidation occurs when a user's account equity falls below the maintenance margin of open positions. Maintenance margin is defined as ½ the initial margin requirements on all markets, which is defined by `1 / max_leverage` of the market. Liquidation Price on Pacifica is calculated as follows:

Copy

```
liquidation_price = [price - (side * position_margin) / position_size] 
                    / (1 - side / max_leverage / 2)
```

Where side = 1 for long, -1 for short positions. Note that the `position_margin` is `account_equity` for cross margin positions; the base `price` should be the current `mark_price` if `account_equity` already includes the unrealized PNL from `entry_price` to the current.

### 

[](#three-tiered-liquidation-process)

Three-Tiered Liquidation Process

1.  **Market Liquidation:** When a user's account equity first falls below maintenance margin, but remains above the backstop liquidation threshold (defined as ⅔ of maintenance margin, see below), all open orders (including ones that would otherwise lower the users' exposure) are cancelled, and the user's positions are first liquidated by sending market orders into the orderbook. During a market liquidation, the user's positions are broken up into smaller chunks, each to be placed as an IOC order at slightly above the backstop liquidation price. The chunking strategy is dynamic and based on market leverage: `Small positions (< $2,000*max_leverage): 1 chunk (execute immediately) Large positions (>= $2,000*max_leverage): 5 chunks` `max(0.75%, maintenance_margin_ratio * 0.4)` of the value of positions liquidated in this manner are deducted by the liquidation engine. Positions large enough to be broken into chunks are sent with a small interval between each order (avrg < 1 second). If enough of the position is closed to restore required maintenance margin levels, any remaining unclosed positions and collateral remains with the trader, resulting in a partial liquidation.
    
2.  **Backstop liquidation:** If a user's account equity falls below ⅔ of the maintenance margin, all of the users' open positions, along with remaining collateral is transferred to a Pacifica backstop liquidator. This is to prevent major orderbook disruption/wicks during large market movements.
    
3.  **Auto-Deleveraging:** If a user's account equity falls to below $0 while still maintaining an open position (caused by tier one and tier two liquidations having insufficient liquidity to carry out the liquidations as specified. Pacifica employs Auto-Deleveraging, automatically closing opposing traders’ profitable positions based on risk priority to maintain overall market health.
    

* * *

These proactive measures ensure that Pacifica’s liquidation process remains robust and fair, protecting traders from cascading liquidations and maintaining overall market stability.

[PreviousTrading Fees](/trading-on-pacifica/trading-fees)[NextDeposits & Withdrawals](/trading-on-pacifica/deposits-and-withdrawals)

Last updated 2 months ago