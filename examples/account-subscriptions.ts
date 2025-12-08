import { PacificaClient } from '../src/index.js';

const WALLET_ADDRESS = process.env.PACIFICA_WALLET_ADDRESS || '';

async function main() {
  if (!WALLET_ADDRESS) {
    console.error('Please set PACIFICA_WALLET_ADDRESS environment variable');
    process.exit(1);
  }

  const client = new PacificaClient({
    testnet: true,
  });

  client.ws.on('open', () => {
    console.log('WebSocket connected!');
    console.log('\nSubscribing to account data streams...');

    client.ws.subscribeAccountInfo(WALLET_ADDRESS);
    client.ws.subscribeAccountPositions(WALLET_ADDRESS);
    client.ws.subscribeAccountOrders(WALLET_ADDRESS);
    client.ws.subscribeAccountOrderUpdates(WALLET_ADDRESS);
    client.ws.subscribeAccountTrades(WALLET_ADDRESS);
    client.ws.subscribeAccountMargin(WALLET_ADDRESS);
    client.ws.subscribeAccountLeverage(WALLET_ADDRESS);

    console.log('Subscribed to all account streams!');
  });

  client.ws.on('close', (code, reason) => {
    console.log(`\nWebSocket closed: ${code} - ${reason}`);
  });

  client.ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });

  client.ws.on('account_info', (data) => {
    console.log('\n[ACCOUNT INFO UPDATE]');
    console.log('  Balance:', data.balance);
    console.log('  Account Equity:', data.account_equity);
    console.log('  Available to Spend:', data.available_to_spend);
    console.log('  Available to Withdraw:', data.available_to_withdraw);
    console.log('  Total Margin Used:', data.total_margin_used);
    console.log('  Positions Count:', data.positions_count);
    console.log('  Orders Count:', data.orders_count);
  });

  client.ws.on('account_positions', (positions) => {
    console.log('\n[POSITIONS UPDATE]');
    console.log(`  Total positions: ${positions.length}`);
    for (const position of positions) {
      console.log(`\n  ${position.symbol} ${position.side.toUpperCase()}`);
      console.log(`    Size: ${position.size}`);
      console.log(`    Entry Price: $${position.entry_price}`);
      console.log(`    Mark Price: $${position.mark_price}`);
      console.log(`    Unrealized PnL: ${position.unrealized_pnl}`);
      console.log(`    Leverage: ${position.leverage}x ${position.margin_mode}`);
    }
  });

  client.ws.on('account_orders', (orders) => {
    console.log('\n[ORDERS UPDATE]');
    console.log(`  Total open orders: ${orders.length}`);
    for (const order of orders) {
      console.log(`\n  Order #${order.order_id}: ${order.symbol} ${order.side.toUpperCase()}`);
      console.log(`    Price: $${order.price}`);
      console.log(`    Amount: ${order.amount}`);
      console.log(`    Filled: ${order.filled}`);
      console.log(`    Status: ${order.status}`);
    }
  });

  client.ws.on('account_order_updates', (update) => {
    console.log('\n[ORDER UPDATE]');
    console.log(`  Type: ${update.update_type}`);
    console.log(`  Order #${update.order.order_id}: ${update.order.symbol} ${update.order.side.toUpperCase()}`);
    console.log(`    Price: $${update.order.price}`);
    console.log(`    Amount: ${update.order.amount}`);
    console.log(`    Filled: ${update.order.filled}`);
    console.log(`    Status: ${update.order.status}`);
  });

  client.ws.on('account_trades', (trades) => {
    console.log('\n[TRADES UPDATE]');
    console.log(`  New trades: ${trades.length}`);
    for (const trade of trades) {
      console.log(`\n  Trade #${trade.trade_id}`);
      console.log(`    Symbol: ${trade.symbol} ${trade.side.toUpperCase()}`);
      console.log(`    Price: $${trade.price}`);
      console.log(`    Amount: ${trade.amount}`);
      console.log(`    Fee: ${trade.fee}`);
      console.log(`    Realized PnL: ${trade.realized_pnl}`);
    }
  });

  client.ws.on('account_margin', (data) => {
    console.log('\n[MARGIN UPDATE]');
    console.log(`  Margin Mode: ${data.margin_mode}`);
    console.log(`  Cross MMR: ${data.cross_mmr}`);
    console.log(`  Total Margin Used: ${data.total_margin_used}`);
    console.log(`  Available to Spend: ${data.available_to_spend}`);
  });

  client.ws.on('account_leverage', (data) => {
    console.log('\n[LEVERAGE UPDATE]');
    console.log(`  Symbol: ${data.symbol}`);
    console.log(`  Leverage: ${data.leverage}x`);
    console.log(`  Margin Mode: ${data.margin_mode}`);
  });

  console.log('Connecting to WebSocket...');
  client.connect();

  process.on('SIGINT', () => {
    console.log('\nDisconnecting...');
    client.disconnect();
    process.exit(0);
  });
}

main().catch(console.error);
