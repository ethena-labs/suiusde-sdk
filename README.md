# SuiUSDe SDK

SDK for interacting with the SuiUSDe stablecoin contract on Sui.

The commands presented below simulate the transaction and output serialized transaction data (base64) that can be:
- Used for a multisig proposal
- Signed directly using a wallet via https://sagat.mystenlabs.com/tools/sign

See [Broadcasting transactions](#broadcasting-transactions) for how to broadcast the signed transaction.

## Prerequisites

- [pnpm](https://pnpm.io/) - Package manager

Install dependencies:

```bash
pnpm install
```

## Commands

### Mint

Mint SUI_USDE tokens by providing USDC collateral.

```bash
pnpm mint \
  <sender_address> \
  <amount_usdc> \
  <expiry_minutes> \
  <min_amount_out> \
  <nonce>
```

| Argument | Description |
|----------|-------------|
| `sender_address` | Benefactor wallet address |
| `amount_usdc` | Amount of USDC to deposit (e.g., `1` for 1 USDC) |
| `expiry_minutes` | Order expiry in minutes from now |
| `min_amount_out` | Minimum SUI_USDE to receive (6 decimals) |
| `nonce` | Unique order identifier |

**Example:**

```bash
pnpm mint 0x146e9f538b1f99bb9dad3d4b4d4401a570c94bc7618903c63501007100b08438 1 5 0.5 "order-001"
```

### Redeem

Redeem SUI_USDE tokens to receive USDC collateral.

```bash
pnpm redeem \
  <sender_address> \
  <amount_suiusde> \
  <expiry_minutes> \
  <min_amount_out> \
  <nonce>
```

| Argument | Description |
|----------|-------------|
| `sender_address` | Benefactor wallet address |
| `amount_suiusde` | Amount of SUI_USDE to redeem (e.g., `1` for 1 token) |
| `expiry_minutes` | Order expiry in minutes from now |
| `min_amount_out` | Minimum USDC to receive (6 decimals) |
| `nonce` | Unique order identifier |

**Example:**

```bash
pnpm redeem 0x146e9f538b1f99bb9dad3d4b4d4401a570c94bc7618903c63501007100b08438 1 5 0.5 "redeem-001"
```

## Broadcasting transactions

1. Sign the transaction data on https://sagat.mystenlabs.com/tools/sign.
2. Once signed, a signature will be displayed on the interface.
3. Go to https://multisig-toolkit.mystenlabs.com/execute-transaction.
4. Enter the transaction data from the command output in **Transaction Bytes (base64 encoded)**.
5. Enter the signature in **Signature Bytes (base64 encoded)**.
6. Once broadcast, the transaction digest (hash) will be displayed.
