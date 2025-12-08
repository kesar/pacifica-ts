<!-- Source: https://docs.pacifica.fi/trading-on-pacifica/margin-and-leverage -->

Pacifica offers Cross Margin and Isolated Margin modes. Margin mode is selected per trading pair, with Cross Margin as default.

_Note: Margin mode cannot be changed for symbols with open positions. Leverage can be increased for symbols with open positions, but cannot be decreased until position is closed._

### 

[](#cross-margin)

Cross Margin

Cross margin utilizes your entire account balance to support all open positions.

**Account Value Calculation:**

Copy

```
account_value = account_cash_balance + pnl
```

Profit and Loss (PnL) for cross-margined positions update continuously as market prices fluctuate, excluding isolated margin positions.

### 

[](#isolated-margin)

Isolated Margin

Isolated margin assigns a dedicated margin amount to each individual position.

### 

[](#initial-margin-calculation)

Initial Margin Calculation

Regardless of margin mode, placing an order reserves initial margin based on your entry price, position size, selected leverage.

Copy

```
initial_margin = (position_size × entry_price / leverage)
```

#### 

[](#unrealized-pnl-and-transfer-margin-requirements)

Unrealized PnL and Withdrawable Balance.

Unrealised PnL can be withdrawn from isolated positions or cross-margined account account, but only if uPnL + account balance is at least 10% of the total notional position value of all open positions and meet the initial margin requirement: `withdrawable_balance = account_balance + unrealized_pnl - max(initial_margin_required, 0.1 * total_position_value)`

Also, `account_balance` cannot be withdrawn past zero, regardless of uPnL.

[PreviousSelf-trade Prevention](/trading-on-pacifica/self-trade-prevention)[NextFunding Rates](/trading-on-pacifica/funding-rates)

Last updated 2 months ago