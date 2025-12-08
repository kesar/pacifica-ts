import bs58 from 'bs58';
import nacl from 'tweetnacl';
import { beforeEach, describe, expect, it } from 'vitest';
import { Signer } from './signer';

describe('Signer', () => {
  let signer: Signer;
  let keypair: nacl.SignKeyPair;
  let privateKey: string;

  beforeEach(() => {
    keypair = nacl.sign.keyPair();
    privateKey = bs58.encode(keypair.secretKey);
    signer = new Signer(privateKey);
  });

  describe('constructor', () => {
    it('should initialize with a valid private key', () => {
      expect(signer).toBeInstanceOf(Signer);
      expect(signer.publicKey).toBeDefined();
      expect(signer.publicKey).toBe(bs58.encode(keypair.publicKey));
    });

    it('should throw an error with an invalid private key', () => {
      expect(() => new Signer('invalid-key')).toThrow();
    });

    it('should handle 32-byte seed', () => {
      const seed = nacl.randomBytes(32);
      const seedBase58 = bs58.encode(seed);
      const signerFromSeed = new Signer(seedBase58);
      expect(signerFromSeed.publicKey).toBeDefined();
    });

    it('should handle 64-byte secret key', () => {
      const keypair = nacl.sign.keyPair();
      const secretKeyBase58 = bs58.encode(keypair.secretKey);
      const signerFromSecretKey = new Signer(secretKeyBase58);
      expect(signerFromSecretKey.publicKey).toBe(bs58.encode(keypair.publicKey));
    });
  });

  describe('recursiveSortKeys', () => {
    it('should sort object keys alphabetically', () => {
      const input = { z: 1, a: 2, m: 3 };
      const result = signer.recursiveSortKeys(input);
      expect(Object.keys(result as object)).toEqual(['a', 'm', 'z']);
    });

    it('should recursively sort nested object keys', () => {
      const input = {
        z: { c: 1, a: 2 },
        a: { y: 3, x: 4 },
      };
      const result = signer.recursiveSortKeys(input) as Record<string, Record<string, number>>;
      expect(Object.keys(result)).toEqual(['a', 'z']);
      expect(Object.keys(result.z)).toEqual(['a', 'c']);
      expect(Object.keys(result.a)).toEqual(['x', 'y']);
    });

    it('should handle arrays of objects', () => {
      const input = [
        { z: 1, a: 2 },
        { y: 3, b: 4 },
      ];
      const result = signer.recursiveSortKeys(input) as Array<Record<string, number>>;
      expect(Object.keys(result[0])).toEqual(['a', 'z']);
      expect(Object.keys(result[1])).toEqual(['b', 'y']);
    });

    it('should handle primitive values', () => {
      expect(signer.recursiveSortKeys(123)).toBe(123);
      expect(signer.recursiveSortKeys('string')).toBe('string');
      expect(signer.recursiveSortKeys(true)).toBe(true);
      expect(signer.recursiveSortKeys(null)).toBe(null);
    });

    it('should handle arrays of primitives', () => {
      const input = [1, 2, 3];
      expect(signer.recursiveSortKeys(input)).toEqual([1, 2, 3]);
    });
  });

  describe('createCompactJSON', () => {
    it('should create compact JSON without whitespace', () => {
      const input = { b: 2, a: 1 };
      const result = signer.createCompactJSON(input);
      expect(result).toBe('{"a":1,"b":2}');
      expect(result).not.toContain(' ');
      expect(result).not.toContain('\n');
    });

    it('should sort keys before creating JSON', () => {
      const input = { z: 3, a: 1, m: 2 };
      const result = signer.createCompactJSON(input);
      expect(result).toBe('{"a":1,"m":2,"z":3}');
    });

    it('should handle nested objects', () => {
      const input = { outer: { z: 1, a: 2 } };
      const result = signer.createCompactJSON(input);
      expect(result).toBe('{"outer":{"a":2,"z":1}}');
    });
  });

  describe('sign', () => {
    it('should create a valid signature', () => {
      const message = 'test message';
      const signature = signer.sign(message);

      expect(signature).toBeDefined();
      expect(typeof signature).toBe('string');
      expect(signature.length).toBeGreaterThan(0);
    });

    it('should create different signatures for different messages', () => {
      const sig1 = signer.sign('message1');
      const sig2 = signer.sign('message2');

      expect(sig1).not.toBe(sig2);
    });

    it('should create consistent signatures for the same message', () => {
      const message = 'test message';
      const sig1 = signer.sign(message);
      const sig2 = signer.sign(message);

      expect(sig1).toBe(sig2);
    });

    it('should produce a base58-encoded signature', () => {
      const signature = signer.sign('test');
      expect(() => bs58.decode(signature)).not.toThrow();
    });
  });

  describe('signRequest', () => {
    it('should sign a request with all required fields', () => {
      const operationType = 'create_order';
      const operationData = {
        symbol: 'BTC',
        price: '50000',
        amount: '0.1',
      };

      const result = signer.signRequest(operationType, operationData);

      expect(result.account).toBe(signer.publicKey);
      expect(result.signature).toBeDefined();
      expect(result.timestamp).toBeDefined();
      expect(result.expiry_window).toBe(30000);
      expect(result.agent_wallet).toBe(null);
      expect(result.symbol).toBe('BTC');
      expect(result.price).toBe('50000');
      expect(result.amount).toBe('0.1');
    });

    it('should use custom expiry window', () => {
      const result = signer.signRequest('test', { data: 'value' }, 60000);
      expect(result.expiry_window).toBe(60000);
    });

    it('should include timestamp within reasonable range', () => {
      const before = Date.now();
      const result = signer.signRequest('test', { data: 'value' });
      const after = Date.now();

      expect(result.timestamp).toBeGreaterThanOrEqual(before);
      expect(result.timestamp).toBeLessThanOrEqual(after);
    });

    it('should flatten operation data into the result', () => {
      const operationData = {
        field1: 'value1',
        field2: 'value2',
        nested: {
          key: 'value',
        },
      };

      const result = signer.signRequest('test', operationData);

      expect(result.field1).toBe('value1');
      expect(result.field2).toBe('value2');
      expect(result.nested).toEqual({ key: 'value' });
    });

    it('should create different signatures for different operation types', () => {
      const data = { value: 'same' };
      const sig1 = signer.signRequest('operation1', data);
      const sig2 = signer.signRequest('operation2', data);

      expect(sig1.signature).not.toBe(sig2.signature);
    });

    it('should create different signatures for different timestamps', async () => {
      const data = { value: 'same' };
      const sig1 = signer.signRequest('operation', data);

      await new Promise((resolve) => setTimeout(resolve, 10));

      const sig2 = signer.signRequest('operation', data);

      expect(sig1.timestamp).not.toBe(sig2.timestamp);
      expect(sig1.signature).not.toBe(sig2.signature);
    });

    it('should support agent wallet signing', () => {
      const accountPublicKey = 'SomeAccountPublicKey123';
      const result = signer.signRequest('create_order', { symbol: 'BTC' }, 30000, accountPublicKey);

      expect(result.account).toBe(accountPublicKey);
      expect(result.agent_wallet).toBe(signer.publicKey);
      expect(result.signature).toBeDefined();
    });

    it('should set agent_wallet to null when no accountPublicKey provided', () => {
      const result = signer.signRequest('create_order', { symbol: 'BTC' });

      expect(result.account).toBe(signer.publicKey);
      expect(result.agent_wallet).toBe(null);
    });
  });

  describe('verify', () => {
    it('should verify a valid signature', () => {
      const message = 'test message';
      const signature = signer.sign(message);

      const isValid = signer.verify(message, signature);
      expect(isValid).toBe(true);
    });

    it('should reject an invalid signature', () => {
      const message = 'test message';
      const signature = signer.sign(message);

      const isValid = signer.verify('different message', signature);
      expect(isValid).toBe(false);
    });

    it('should verify with a different public key', () => {
      const message = 'test message';
      const signature = signer.sign(message);

      const isValid = signer.verify(message, signature, signer.publicKey);
      expect(isValid).toBe(true);
    });

    it('should reject signature from different keypair', () => {
      const message = 'test message';
      const signature = signer.sign(message);

      const otherKeypair = nacl.sign.keyPair();
      const otherPublicKey = bs58.encode(otherKeypair.publicKey);

      const isValid = signer.verify(message, signature, otherPublicKey);
      expect(isValid).toBe(false);
    });
  });
});
