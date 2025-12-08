import { PacificaClient } from '../src/index.js';

async function main() {
  const client = new PacificaClient({
    testnet: true,
  });

  console.log('Fetching market information...');
  const markets = await client.api.getMarketInfo();
  console.log('Available markets:', markets.map(m => m.symbol).join(', '));

  console.log('\nFetching current prices...');
  const prices = await client.api.getPrices();
  for (const price of prices) {
    console.log(`${price.symbol}: $${price.mark} (24h volume: $${price.volume_24h})`);
  }

  console.log('\nFetching BTC orderbook...');
  const orderbook = await client.api.getOrderbook({ symbol: 'BTC', depth: 5 });
  console.log('Top 5 bids:', orderbook.bids.slice(0, 5));
  console.log('Top 5 asks:', orderbook.asks.slice(0, 5));

  console.log('\nFetching recent BTC trades...');
  const trades = await client.api.getRecentTrades({ symbol: 'BTC', limit: 10 });
  console.log(`Last ${trades.length} trades:`, trades);

  console.log('\nFetching BTC 1h candles...');
  const candles = await client.api.getCandleData({
    symbol: 'BTC',
    interval: '1h',
    limit: 24
  });
  console.log(`Fetched ${candles.length} hourly candles`);
}

main().catch(console.error);
