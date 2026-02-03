# SuiUSDe SDK

SDK for interacting with the SuiUSDe stablecoin contract on Sui.

The commands simulate the transaction and output serialized transaction data (base64) that can be:
- Used for a multisig proposal
- Signed directly using a wallet via https://sagat.mystenlabs.com/tools/sign

Example of generated data:

```
AAAKAQBT4ABAo1ONorJaU7z5QZxdMoQC8kKyfrtdI/NS0vEpnWSwpS0AAAAAIDhCXoNiXueiziAizxMWsq2F2sMd4tUiqvcJMm4rgfZaAAhAQg8AAAAAAAEB5sPITDS6L0hptd8jFh6ocAwU4d4TKICCWHAlZ+QDZuoutTstAAAAAAEBAUEkdQH+hsxyV7mlkWLPryZgN2vfdOtby4q+I4yRyxFwLrU7LQAAAAABAQFd7GInM6IEyif1qQ2ML61FPMZmUYb9Xf8TqD0LbJAnqzEFMwEAAAAAAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYBAAAAAAAAAAAACFkfbiWcAQAAAAggoQcAAAAAAAALCnJlZGVlbS0wMDEAIBRun1OLH5m7na09S01EAaVwyUvHYYkDxjUBAHEAsIQ4BwIBAAABAQEAAEHVh+UzbxyGytUNOKcTbbmTM7ub2pHOpLppEV3v6xQCDnBlcm1pc3Npb25sZXNzEG5ld19vcmFjbGVfcHJvb2YAAgECAAEDAABB1YflM28chsrVDTinE225kzO7m9qRzqS6aRFd7+sUAg5wZXJtaXNzaW9ubGVzcxFjb21taXRfcHl0aF9wcmljZQAFAQIAAQMAAQQAAgEAAQUAAEHVh+UzbxyGytUNOKcTbbmTM7ub2pHOpLppEV3v6xQCBW9yZGVyA25ldwEHQdWH5TNvHIbK1Q04pxNtuZMzu5vakc6kumkRXe/rFAIIc3VpX3VzZGUIU1VJX1VTREUABQMAAAAAAQYAAQcAAQgAAQUAAEHVh+UzbxyGytUNOKcTbbmTM7ub2pHOpLppEV3v6xQCBGF1dGgIbmV3X2F1dGgBB0HVh+UzbxyGytUNOKcTbbmTM7ub2pHOpLppEV3v6xQCBXJvbGVzDkJlbmVmYWN0b3JSb2xlAAEBAgAAQdWH5TNvHIbK1Q04pxNtuZMzu5vakc6kumkRXe/rFAIKYmVuZWZhY3RvcgZyZWRlZW0BB9ujRnLjDLBlsfk+OrVTGHaP1v72bBWULJ98uEbi+QDnBHVzZGMEVVNEQwAFAQIAAgQAAgMAAQUAAgEAAQECBQABCQAUbp9Tix+Zu52tPUtNRAGlcMlLx2GJA8Y1AQBxALCEOAF2Uzja1uQ5l4Vq46QfFaK/pqD1J0ubPrD7NpeOi4+QL2SwpS0AAAAAIOk4GgKgyUF3fDE3ZEA9n6SY17bTwMP0bjDSUJehOo9oFG6fU4sfmbudrT1LTUQBpXDJS8dhiQPGNQEAcQCwhDjoAwAAAAAAAIDw+gIAAAAAAA==
```


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
