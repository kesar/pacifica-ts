import { defineConfig } from 'tsup';

export default defineConfig({
  // Entry point
  entry: ['src/index.ts'],

  // Output formats - CJS for Node, ESM for modern bundlers
  format: ['cjs', 'esm'],

  // Generate TypeScript declarations with enhanced resolution
  dts: {
    resolve: true,
  },

  // Clean output directory before build
  clean: true,

  // Minify output for production
  minify: true,

  // Tree-shake to remove unused code (advanced preset)
  treeshake: {
    preset: 'recommended',
  },

  // Split output into chunks for better code splitting
  splitting: true,

  // Generate source maps for debugging (only in dev mode)
  sourcemap: false,

  // Target modern JavaScript (ES2020 for broad compatibility)
  target: 'es2020',

  // Keep external dependencies external (don't bundle them)
  external: [
    '@solana/web3.js',
    'bs58',
    'eventemitter3',
    'isomorphic-ws',
    'tweetnacl',
    'ws',
  ],

  // Remove comments and console logs in production
  pure: ['console.log', 'console.debug', 'console.trace'],

  // Platform target
  platform: 'neutral', // Works in both Node.js and browser environments

  // Output configuration
  outDir: 'dist',

  // Bundle configuration
  bundle: true,

  // Shims for Node.js built-ins when targeting browser
  shims: false,

  // Don't inject process or define
  define: {},

  // Output ESM with .mjs extension for better compatibility
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.js' : '.mjs',
    };
  },
});
