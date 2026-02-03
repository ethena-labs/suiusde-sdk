// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { execSync } from 'child_process';
import fs, { readFileSync } from 'fs';
import { homedir } from 'os';
import path from 'path';
import { getFullnodeUrl, SuiClient, type SuiTransactionBlockResponse } from '@mysten/sui/client';
import { decodeSuiPrivateKey } from '@mysten/sui/cryptography';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Secp256k1Keypair } from '@mysten/sui/keypairs/secp256k1';
import { Secp256r1Keypair } from '@mysten/sui/keypairs/secp256r1';
import { Transaction } from '@mysten/sui/transactions';
import { fromBase64, toBase64 } from '@mysten/sui/utils';

export type Network = 'mainnet' | 'testnet' | 'devnet' | 'localnet';

const SUI = process.env.SUI_BINARY ?? `sui`;

export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const getActiveNetwork = (): Network => {
	return execSync(`${SUI} client active-env`, { encoding: 'utf8' }).trim() as Network;
};

export const getActiveAddress = () => {
	return execSync(`${SUI} client active-address`, { encoding: 'utf8' }).trim();
};

/// Returns a signer based on the active address of system's sui.
export const getSigner = () => {
	if (process.env.PRIVATE_KEY) {
		console.log('Using supplied private key.');
		const { schema, secretKey } = decodeSuiPrivateKey(process.env.PRIVATE_KEY);

		if (schema === 'ED25519') return Ed25519Keypair.fromSecretKey(secretKey);
		if (schema === 'Secp256k1') return Secp256k1Keypair.fromSecretKey(secretKey);
		if (schema === 'Secp256r1') return Secp256r1Keypair.fromSecretKey(secretKey);

		throw new Error('Keypair not supported.');
	}

	const sender = getActiveAddress();

	const keystore = JSON.parse(
		readFileSync(path.join(homedir(), '.sui', 'sui_config', 'sui.keystore'), 'utf8'),
	);

	for (const priv of keystore) {
		const raw = fromBase64(priv);
		if (raw[0] !== 0) {
			continue;
		}

		const pair = Ed25519Keypair.fromSecretKey(raw.slice(1));
		if (pair.getPublicKey().toSuiAddress() === sender) {
			return pair;
		}
	}

	throw new Error(`keypair not found for sender: ${sender}`);
};

/// Get the client for the specified network.
export const getClient = (network: Network) => {
	return new SuiClient({ url: getFullnodeUrl(network) });
};

/// A helper to sign & execute a transaction.
export const signAndExecute = async (txb: Transaction, network: Network) => {
	const client = getClient(network);
	const signer = getSigner();

	return client.signAndExecuteTransaction({
		transaction: txb,
		signer,
		// requestType: 'WaitForEffectsCert',
		options: {
			showEffects: true,
			showObjectChanges: true,
		},
	});
};

export const sender = (txb: Transaction) => {
	return txb.moveCall({
		target: `0x2::tx_context::sender`,
	});
}

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
