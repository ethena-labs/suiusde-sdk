// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import { toBase64 } from '@mysten/sui/utils';

export type Network = 'mainnet' | 'testnet' | 'devnet' | 'localnet';

export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

/// Get the client for the specified network.
export const getClient = (network: Network) => {
	return new SuiClient({ url: getFullnodeUrl(network) });
};

/// Builds a transaction (unsigned) and saves it on `setup/tx/tx-data.txt` (on production)
/// or `setup/src/tx-data.local.txt` on mainnet.
export const prepareMultisigTx = async (tx: Transaction, network: Network, adminAddress: string) => {
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
	if (!dryRun) throw new Error('This transaction failed.');

	tx.build({
		client: client,
	}).then((bytes) => {
		let serializedBase64 = toBase64(bytes);

		console.log(serializedBase64);
	});
};

/// Fetch the gas Object and setup the payment for the tx.
async function setupGasPayment(tx: Transaction, gasObjectId: string, client: SuiClient) {
	const gasObject = await client.getObject({ id: gasObjectId });

	if (!gasObject.data) throw new Error('Invalid Gas Object supplied.');

	// set the gas payment.
	tx.setGasPayment([
		{
			objectId: gasObject.data.objectId,
			version: gasObject.data.version,
			digest: gasObject.data.digest,
		},
	]);
}

/// A helper to dev inspect a transaction.
export async function inspectTransaction(tx: Transaction, client: SuiClient) {
	const result = await client.dryRunTransactionBlock({
		transactionBlock: await tx.build({ client: client }),
	});
	// log the result.
	console.dir(result, { depth: null });

	return result;
}
