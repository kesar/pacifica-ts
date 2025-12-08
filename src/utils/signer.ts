import bs58 from 'bs58';
import nacl from 'tweetnacl';
import type { SignatureHeader, SignedRequestHeader } from '../types/index.js';

export class Signer {
  private keypair: nacl.SignKeyPair;
  public readonly publicKey: string;

  constructor(privateKey: string) {
    // Decode the Base58 private key
    const privateKeyBytes = bs58.decode(privateKey);

    // For Solana/Ed25519, the secret key is 64 bytes (32 bytes seed + 32 bytes public key)
    // tweetnacl expects the full 64-byte secret key
    if (privateKeyBytes.length === 64) {
      this.keypair = nacl.sign.keyPair.fromSecretKey(privateKeyBytes);
    } else if (privateKeyBytes.length === 32) {
      // If only seed is provided, generate keypair from seed
      this.keypair = nacl.sign.keyPair.fromSeed(privateKeyBytes);
    } else {
      throw new Error('Invalid private key length. Expected 32 or 64 bytes.');
    }

    this.publicKey = bs58.encode(this.keypair.publicKey);
  }

  recursiveSortKeys(value: unknown): unknown {
    if (Array.isArray(value)) {
      return value.map((item) => this.recursiveSortKeys(item));
    }

    if (value !== null && typeof value === 'object') {
      const sortedObj: Record<string, unknown> = {};
      const keys = Object.keys(value).sort();

      for (const key of keys) {
        sortedObj[key] = this.recursiveSortKeys((value as Record<string, unknown>)[key]);
      }

      return sortedObj;
    }

    return value;
  }

  createCompactJSON(data: unknown): string {
    const sorted = this.recursiveSortKeys(data);
    return JSON.stringify(sorted);
  }

  sign(message: string): string {
    const messageBytes = Buffer.from(message, 'utf-8');
    const signature = nacl.sign.detached(messageBytes, this.keypair.secretKey);
    return bs58.encode(signature);
  }

  signRequest<T extends Record<string, unknown>>(
    operationType: string,
    operationData: T,
    expiryWindow: number = 30000,
    accountPublicKey?: string
  ): SignedRequestHeader & T {
    const timestamp = Date.now();

    const signatureHeader: SignatureHeader = {
      timestamp,
      expiry_window: expiryWindow,
      type: operationType,
    };

    const dataToSign = {
      ...signatureHeader,
      data: operationData,
    };

    const compactJSON = this.createCompactJSON(dataToSign);
    const signature = this.sign(compactJSON);

    const requestHeader: SignedRequestHeader = {
      account: accountPublicKey || this.publicKey,
      agent_wallet: accountPublicKey ? this.publicKey : null,
      signature,
      timestamp,
      expiry_window: expiryWindow,
    };

    return {
      ...requestHeader,
      ...operationData,
    };
  }

  /**
   * Verify a signature (useful for testing)
   */
  verify(message: string, signatureBase58: string, publicKeyBase58?: string): boolean {
    const publicKey = publicKeyBase58
      ? bs58.decode(publicKeyBase58)
      : this.keypair.publicKey;

    const messageBytes = Buffer.from(message, 'utf-8');
    const signatureBytes = bs58.decode(signatureBase58);

    return nacl.sign.detached.verify(messageBytes, signatureBytes, publicKey);
  }
}
