// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { SuiGrpcClient } from "@mysten/sui/grpc";
import { Transaction } from "@mysten/sui/transactions";
import { toBase64 } from "@mysten/sui/utils";

export type Network = "mainnet" | "testnet" | "devnet" | "localnet";

const DEFAULT_GRPC_URLS: Record<Network, string> = {
  mainnet: "https://fullnode.mainnet.sui.io:443",
  testnet: "https://fullnode.testnet.sui.io:443",
  devnet: "https://fullnode.devnet.sui.io:443",
  localnet: "http://127.0.0.1:9000",
};

export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

/// Get the client for the specified network.
/// Set `SUI_GRPC_URL` to override the default public fullnode (rate-limited, dev only)
/// with a dedicated gRPC-enabled endpoint.
export const getClient = (network: Network) => {
  return new SuiGrpcClient({
    network,
    baseUrl: process.env.SUI_GRPC_URL ?? DEFAULT_GRPC_URLS[network],
  });
};

/// Builds a transaction (unsigned) and saves it on `setup/tx/tx-data.txt` (on production)
/// or `setup/src/tx-data.local.txt` on mainnet.
export const prepareMultisigTx = async (
  tx: Transaction,
  network: Network,
  adminAddress: string,
) => {
  const client = getClient(network);
  const gasObjectId = process.env.GAS_OBJECT;

  // enabling the gas Object check only on mainnet, to allow testnet multisig tests.
  // if (!gasObjectId) throw new Error('No gas object supplied for a mainnet transaction');

  // set the gas budget.
  tx.setGasBudget(50_000_000);

  // set the sender to be the admin address from config.
  tx.setSenderIfNotSet(adminAddress as string);

  // setting up gas object for the multi-sig transaction
  if (gasObjectId) await setupGasPayment(tx, gasObjectId, client);

  // first do a dryRun, to make sure we are getting a success.
  const dryRun = await inspectTransaction(tx, client);
  if (!dryRun) throw new Error("This transaction failed.");

  tx.build({
    client: client,
  }).then((bytes) => {
    let serializedBase64 = toBase64(bytes);

    console.log(serializedBase64);
  });
};

/// Fetch the gas Object and setup the payment for the tx.
async function setupGasPayment(
  tx: Transaction,
  gasObjectId: string,
  client: SuiGrpcClient,
) {
  const { object: gasObject } = await client.core.getObject({ objectId: gasObjectId });

  // set the gas payment.
  tx.setGasPayment([
    {
      objectId: gasObject.objectId,
      version: gasObject.version,
      digest: gasObject.digest,
    },
  ]);
}

/// A helper to dev inspect a transaction.
export async function inspectTransaction(tx: Transaction, client: SuiGrpcClient) {
  const result = await client.transaction.simulateTransaction({
    transaction: await tx.build({ client }),
    include: { effects: true, events: true, balanceChanges: true },
  });
  // log the result.
  console.dir(result, { depth: null });

  return result;
}
