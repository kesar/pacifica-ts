import { PacificaClient, BusinessLogicError, RateLimitError } from '../src/index.js';

const PRIVATE_KEY = process.env.PACIFICA_PRIVATE_KEY || '';
const WALLET_ADDRESS = process.env.PACIFICA_WALLET_ADDRESS || '';

async function main() {
  if (!PRIVATE_KEY) {
    console.error('Please set PACIFICA_PRIVATE_KEY environment variable');
    process.exit(1);
  }

  if (!WALLET_ADDRESS) {
    console.error('Please set PACIFICA_WALLET_ADDRESS environment variable');
    process.exit(1);
  }

  const client = new PacificaClient({
    privateKey: PRIVATE_KEY,
    testnet: true,
  });

  console.log('Fetching account information...');
  const accountInfo = await client.api.getAccountInfo(WALLET_ADDRESS);
  console.log('Account balance:', accountInfo.balance);
  console.log('Available to spend:', accountInfo.available_to_spend);
  console.log('Account equity:', accountInfo.account_equity);

  console.log('\nFetching current positions...');
  const positions = await client.api.getPositions(WALLET_ADDRESS);
  console.log(`Open positions: ${positions.length}`);
  for (const position of positions) {
    console.log(`  ${position.symbol} ${position.side}: ${position.size} @ $${position.entry_price}`);
    console.log(`    Unrealized PnL: ${position.unrealized_pnl}`);
  }

  console.log('\nFetching open orders...');
  const orders = await client.api.getOpenOrders(WALLET_ADDRESS);
  console.log(`Open orders: ${orders.length}`);
  for (const order of orders) {
    console.log(`  ${order.symbol} ${order.side}: ${order.amount} @ $${order.price}`);
  }

  console.log('\nExample: Creating a limit order...');
  try {
    const orderResult = await client.api.createLimitOrder({
      symbol: 'BTC',
      price: '50000',
      amount: '0.001',
      side: 'bid',
      tif: 'GTC',
      reduce_only: false,
      client_order_id: crypto.randomUUID(),
    });
    console.log('Order created successfully:', orderResult.order_id);

    console.log('\nCancelling the order...');
    await client.api.cancelOrder({ order_id: orderResult.order_id });
    console.log('Order cancelled successfully');

  } catch (error) {
    if (error instanceof BusinessLogicError) {
      console.error('Business logic error:', error.message, `(code: ${error.code})`);
    } else if (error instanceof RateLimitError) {
      console.error('Rate limit exceeded. Please wait before retrying.');
    } else {
      console.error('Error:', error);
    }
  }

  console.log('\nExample: Creating a market order...');
  try {
    const marketOrderResult = await client.api.createMarketOrder({
      symbol: 'ETH',
      amount: '0.01',
      side: 'bid',
      reduce_only: false,
    });
    console.log('Market order created:', marketOrderResult.order_id);
  } catch (error) {
    if (error instanceof BusinessLogicError) {
      console.error('Business logic error:', error.message);
    } else {
      console.error('Error:', error);
    }
  }

  console.log('\nExample: Batch order operations...');
  try {
    const batchResult = await client.api.batchOrder({
      orders: [
        {
          type: 'create',
          order: {
            symbol: 'BTC',
            price: '49000',
            amount: '0.001',
            side: 'bid',
            tif: 'GTC',
            reduce_only: false,
          }
        },
        {
          type: 'create',
          order: {
            symbol: 'BTC',
            price: '51000',
            amount: '0.001',
            side: 'ask',
            tif: 'GTC',
            reduce_only: false,
          }
        },
      ]
    });
    console.log('Batch order results:', batchResult.results);
  } catch (error) {
    console.error('Batch order error:', error);
  }

  console.log('\nExample: Setting position TP/SL...');
  try {
    await client.api.createPositionTPSL({
      symbol: 'BTC',
      take_profit: {
        stop_price: '55000',
        limit_price: '54900',
      },
      stop_loss: {
        stop_price: '48000',
      }
    });
    console.log('TP/SL set successfully');
  } catch (error) {
    console.error('TP/SL error:', error);
  }

  console.log('\nExample: Updating leverage...');
  try {
    await client.api.updateLeverage({
      symbol: 'BTC',
      leverage: 10,
      margin_mode: 'cross',
    });
    console.log('Leverage updated successfully');
  } catch (error) {
    console.error('Leverage update error:', error);
  }
}

main().catch(console.error);
