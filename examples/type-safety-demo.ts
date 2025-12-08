import { PacificaClient } from '../src/index.js';

async function demonstrateTypeSafety() {
  const client = new PacificaClient({ testnet: true });

  // ✅ TYPE SAFE: 'prices' is a valid event name
  // The callback parameter 'data' is automatically typed as PriceData[]
  client.ws.on('prices', (data) => {
    // TypeScript knows data is PriceData[]
    console.log(data[0].symbol); // ✅ Autocomplete works!
    console.log(data[0].mark);   // ✅ Autocomplete works!
    // console.log(data[0].invalid); // ❌ TypeScript error!
  });

  // ✅ TYPE SAFE: 'orderbook' with correct callback signature
  client.ws.on('orderbook', (data) => {
    // TypeScript knows data is Orderbook
    console.log(data.symbol);     // ✅ Autocomplete works!
    console.log(data.bids);       // ✅ Autocomplete works!
  });

  // ✅ TYPE SAFE: 'account_positions' with correct callback signature
  client.ws.on('account_positions', (positions) => {
    // TypeScript knows positions is Position[]
    for (const pos of positions) {
      console.log(pos.symbol);          // ✅ Autocomplete works!
      console.log(pos.unrealized_pnl);  // ✅ Autocomplete works!
    }
  });

  // ❌ TYPE ERROR: Invalid event name (uncomment to see error)
  // client.ws.on('invalid_event', (data) => {
  //   console.log(data);
  // });

  // ❌ TYPE ERROR: Wrong callback signature (uncomment to see error)
  // client.ws.on('prices', (data: string) => {
  //   // Error: Type '(data: string) => void' is not assignable to type '(data: PriceData[]) => void'
  //   console.log(data);
  // });

  // ✅ TYPE SAFE: removeListener is also type-safe
  const priceHandler = (data: ReturnType<Parameters<typeof client.ws.on<'prices'>>[1]> extends (arg: infer T) => void ? T : never) => {
    console.log('Price update:', data);
  };

  client.ws.on('prices', priceHandler);
  client.ws.off('prices', priceHandler);
}

// This demonstrates that:
// 1. Event names are type-checked (autocomplete + errors for invalid names)
// 2. Callback parameters are automatically typed
// 3. You get full IntelliSense for the data structure
// 4. Both .on() and .off() are type-safe

demonstrateTypeSafety();
