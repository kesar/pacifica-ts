import { PacificaClient } from '../src/index.js';

async function main() {
  const client = new PacificaClient({
    testnet: true,
  });

  client.ws.on('open', () => {
    console.log('WebSocket connected!');

    console.log('\nSubscribing to market data streams...');
    client.ws.subscribePrices();
    client.ws.subscribeOrderbook('BTC');
    client.ws.subscribeTrades('BTC');
    client.ws.subscribeCandle('BTC', '1m');
  });

  client.ws.on('close', (code, reason) => {
    console.log(`WebSocket closed: ${code} - ${reason}`);
  });

  client.ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });

  client.ws.on('prices', (data) => {
    console.log('\n[PRICES UPDATE]');
    for (const price of data) {
      console.log(`  ${price.symbol}: mark=$${price.mark}, funding=${price.funding}`);
    }
  });

  client.ws.on('orderbook', (data) => {
    console.log('\n[ORDERBOOK UPDATE]', data.symbol);
    console.log('  Best bid:', data.bids[0]?.price);
    console.log('  Best ask:', data.asks[0]?.price);
  });

  client.ws.on('trades', (data) => {
    console.log('\n[TRADES]', data.length, 'new trades');
    for (const trade of data) {
      console.log(`  ${trade.side} ${trade.amount} @ $${trade.price}`);
    }
  });

  client.ws.on('candle', (data) => {
    console.log('\n[CANDLE]');
    console.log(`  Open: ${data.open}`);
    console.log(`  High: ${data.high}`);
    console.log(`  Low: ${data.low}`);
    console.log(`  Close: ${data.close}`);
    console.log(`  Volume: ${data.volume}`);
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
