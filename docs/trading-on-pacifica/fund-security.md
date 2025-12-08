<!-- Source: https://docs.pacifica.fi/trading-on-pacifica/fund-security -->

In the high-stakes world of decentralized finance, security is the foundation upon which everything else is built. At Pacifica, our mission has always been to build the most powerful and secure perpetual DEX, one that rivals the performance of centralized exchanges without sacrificing the self-custodial ethos that makes DeFi revolutionary.

Since our mainnet launch we have processed significant volume, earning the trust of a rapidly growing community of active traders. This trust is our most valuable asset. In order to keep up with the continuously raising stakes of growth, Pacifica is transitioning to a sophisticated hot-cold hybrid security architecture with multi-signature governance.

## 

[](#the-inherent-tension-power-vs.-protection)

The Inherent Tension: Power vs. Protection

The core challenge for any high-performance perpetual DEX is managing the "withdrawal authority", the logic within a smart contract that permits the movement of user funds. To facilitate instant withdrawals, this authority must be readily accessible to the matching engine. However, concentrating this access in a single, always-online endpoint creates systemic risk.

Most perpetual DEXs operate with a unified smart contract architecture where all user funds reside in a single upgradeable contract. In these systems, the proxy contract holds user funds and delegates calls to a logic contract. If administrators can upgrade this logic, they possess the ability to modify withdrawal permissions. The contract logic is flexible, but ultimate control rests with whoever holds the admin keys. If the withdrawal authority is compromised, all funds are exposed. Subsequent effects of this are then: if the smart contract has a vulnerability, all funds are at risk, and if admin keys are stolen, the contract logic itself can be upgraded to drain user capital. There's no segmentation, no firebreak, no defense in depth.

## 

[](#the-pacifica-protocol-layered-proactive-security)

The Pacifica Protocol: Layered, Proactive Security

We aim to think beyond this single-point-of-failure paradigm entirely. Our new design creating a multi-layered defense system that is both resilient and non-custodial. This is the culmination of best practices implemented in a transparent, verifiable manner.

### 

[](#the-hot-wallet-the-engine-of-commerce)

The Hot Wallet: The Engine of Commerce

This is the operational treasury and represents only a fraction of total funds.

The hot wallet is managed by the matching engine, which can execute withdrawals up to the programmatic spending limit without additional approvals. This ensures legitimate user withdrawals remain instantaneous. If compromised through an engine key breach, smart contract exploit, or social engineering attack, an attacker can only access the limited funds in the hot wallet.

### 

[](#the-cold-vault-the-fortress-of-funds)

The Cold Vault: The Fortress of Funds

The bulk of user capital resides in the cold vault, secured by a multi-signature smart contract governed by a decentralized council that is geo-distributed across multiple continents. This vault has one primary function: to replenish the hot wallet through programmatic spending limits.

We've partnered with Squads Protocol, the leading multi-signature infrastructure securing over $10 billion in assets on Solana. Squads is the first formally verified program on Solana, meaning its code has undergone mathematical proofs of correctness beyond traditional auditing. The multi-signature requirement means multiple independent parties must approve any transaction before it executes, eliminating the single point of failure inherent in traditional single-key wallets.

Squads enables time-locked upgrade mechanisms that introduce mandatory delays between proposal and execution, giving users visibility and the ability to exit if they disagree. Role-based access control defines who can propose, approve, and execute transactions. Emergency pause functionality requires multi-party consensus. The cold vault cannot send funds to arbitrary addresses. Its logic is constrained by design, making it technically impossible for any party to redirect funds elsewhere.

### 

[](#the-unbreakable-chain-of-custody)

The Unbreakable Chain of Custody

The true innovation lies in the interaction between these two layers, creating a security model that provides both operational efficiency and ironclad protection.

When a user requests a withdrawal, the matching engine processes it instantly from the hot wallet. If the hot wallet balance dips below a predefined threshold, a replenishment process is automatically initiated, which requires a consensus-approved transaction from the decentralized multi-sig governing the cold vault. Multiple independent signers must review and approve the transfer, ensuring that no single party can unilaterally move funds from cold storage.

The cold vault then sends only the necessary amount to replenish the hot wallet up to its operational limit, never exceeding the predetermined cap. This creates a security guarantee: even in a worst-case scenario where our operational systems are fully compromised, where an attacker gains control of the matching engine, the AWS infrastructure, or even internal access credentials, they can only access the limited funds in the hot wallet. The majority of funds remain safe.

Using Squads' programmatic spending limit feature, we can allocate specific withdrawal budgets to the hot wallet without requiring full multi-signature approval for every routine operation. For example, the hot wallet might have a daily limit of $5 million USDC for user withdrawals. Any attempt to exceed this limit automatically triggers multi-signature requirements. The system is self-enforcing; the blockchain itself prevents unauthorized fund movements.

### 

[](#signer-level-separation-the-technical-advantage)

Signer-Level Separation: The Technical Advantage

Our architecture implements security at the signer level, creating distinct roles with different permissions and capabilities. The hot signer, controlled by the engine operator, can withdraw up to the Squads wallet's spending limit in a specified time duration. The cold signers, a distributed group of multi-sig members, control reserve funds and have the authority to adjust spending limits through consensus. The upgrade authority is distributed across multi-sig participants, not held by any individual or single organization.

This means any single party attempting to compromise the exchange, whether external attacker or rogue insider, can only access the limited funds in the hot wallet. The spending limit acts as a firebreak, containing potential damage and preventing catastrophic loss.

Let's examine potential attack scenarios:

Attack Vector

Single Contract

Pacifica Hot/Cold Hybrid

Engine compromise

All funds exposed

Only hot wallet funds exposed

Smart contract exploit

All funds at risk

Only hot wallet funds at risk

Admin key compromise

Can upgrade to drain all funds

Requires multi-sig;

spending limits enforced

Social engineering

Single point of failure

Multiple parties must be compromised

Inside threat

Unilateral access possible

Impossible without multi-party collusion

## 

[](#why-this-is-a-better-solution)

Why This is a Better Solution

This hot-cold hybrid model doesn't just improve upon existing security practices. It represents a fundamental rethinking of how perpetual DEXs should protect user capital.

### 

[](#uncompromising-decentralization)

Uncompromising Decentralization

By vesting control of the cold vault in a decentralized multi-sig, we eliminate any single point of failure's ability to bring down the entire system. The distributed governance model ensures that even if several parties are compromised, the threshold mechanism prevents unauthorized access to the majority of funds.

### 

[](#verifiable-security-over-blind-trust)

Verifiable Security Over Blind Trust

Our model allows the community to audit the key facts: the spending limit of the hot wallet and the immutable logic of the cold vault. You don't have to trust us; you can verify the security model on-chain. Every parameter, every threshold, every authorization is recorded on the blockchain and can be independently verified by anyone.

Any proposed change to withdrawal authorities or spending limits requires not only multi-signature approval but also a time-locked execution period, giving users visibility into governance decisions and the ability to withdraw their funds if they disagree.

### 

[](#built-for-scale)

Built for Scale

This architecture is designed to grow with us. As our TVL expands into the hundreds of millions and even billions, the risk profile remains constant. Whether we're securing $100 million or $10 billion in user funds, the fundamental security guarantees remain unchanged: the hot wallet cap limits exposure, the multi-sig prevents unauthorized cold storage access, and the spending limits act as an automatic circuit breaker.

## 

[](#conclusion-security-as-a-first-principle)

Conclusion: Security as a First Principle

The transition to hot-cold hybrid architecture with multi-signature governance and programmatic spending limits represents more than a technical upgrade. It's a statement that we prioritize long-term security over short-term convenience, and that decentralized finance can meet the highest security standards while exceeding centralized platforms in transparency and verifiability.

As we continue scaling toward becoming the leading perpetual DEX, security architecture that protects billions in user funds lays an ironclad foundation. We build for the future.

[PreviousDeposits & Withdrawals](/trading-on-pacifica/deposits-and-withdrawals)[NextPoints Program](/points-program)

Last updated 26 days ago