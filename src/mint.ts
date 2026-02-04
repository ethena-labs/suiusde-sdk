import { Transaction } from "@mysten/sui/transactions";
import { MAINNET_CONSTANTS } from "./constants.js";
import { SuiUSDE, type OrderOptions } from "./suiusde.js";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { prepareMultisigTx } from "./utils/transaction.js";
import { getCoin } from "./utils/coin.js";

const DECIMALS = 6;

const mintData = async () => {
    const address = process.argv[2];
    const amountArg = process.argv[3];
    const expiryMsArg = process.argv[4];
    const minAmountOutArg = process.argv[5];
    const nonce = process.argv[6];

    if (!address || !amountArg || !expiryMsArg || !minAmountOutArg || !nonce) {
        console.error('Usage: mint <sender_address> <amount_usdc> <expiry_minutes> <min_amount_out> <nonce>');
        console.error('  amount_usdc:     Amount of USDC to mint (e.g., 100 for 100 USDC)');
        console.error('  expiry_minutes:  Order expiry in minutes from now (e.g., 5 for 5 minutes)');
        console.error('  min_amount_out:  Minimum output amount (6 decimals, e.g., 99.5 for 99.5 tokens)');
        console.error('  nonce:           Unique order identifier');
        process.exit(1);
    }

    const amountUsdc = parseFloat(amountArg);
    if (isNaN(amountUsdc) || amountUsdc <= 0) {
        console.error('Invalid amount. Must be a positive number.');
        process.exit(1);
    }

    const expiryMinutes = parseFloat(expiryMsArg);
    if (isNaN(expiryMinutes) || expiryMinutes <= 0) {
        console.error('Invalid expiry. Must be a positive number of minutes.');
        process.exit(1);
    }
    const expiryMs = Date.now() + Math.floor(expiryMinutes * 60 * 1000);

    const minAmountOut = parseFloat(minAmountOutArg);
    if (isNaN(minAmountOut) || minAmountOut < 0) {
        console.error('Invalid minAmountOut. Must be a non-negative number.');
        process.exit(1);
    }

    // Convert to smallest unit (6 decimals)
    const amountRaw = BigInt(Math.floor(amountUsdc * 10 ** DECIMALS));
    const minAmountOutRaw = Math.floor(minAmountOut * 10 ** DECIMALS);

    const tx = new Transaction();
    const constants = MAINNET_CONSTANTS;

    const client = new SuiClient({ url: getFullnodeUrl('mainnet') });
    const suiusdeClient = new SuiUSDE(constants, client);

    console.log('Benefactor address:', address);
    console.log('Amount USDC:', amountUsdc);
    console.log('Expiry minutes:', expiryMinutes);
    console.log('Min amount out:', minAmountOut);
    console.log('Nonce:', nonce);

    tx.setGasPrice(1000);

    // Get USDC coin for the specified amount
    const usdcCoin = await getCoin(
        tx,
        client,
        address,
        amountRaw,
        constants.collaterals.usdc.type
    );

    // Create oracle proof and commit Pyth price
    const oracleProof = suiusdeClient.newOracleProof(tx, 'usdc');
    suiusdeClient.commitPythPrice(
        tx,
        'usdc',
        tx.object(constants.collaterals.usdc.pyth.priceInfoObjectId),
        oracleProof
    );

    const orderOptions: OrderOptions = {
        coin: usdcCoin,
        expiryMs,
        minAmountOut: minAmountOutRaw,
        nonce,
        collateralKey: 'usdc',
        oracleProof,
    };

    const mintedCoin = suiusdeClient.benefactorActions(tx).mint(orderOptions);

    // Transfer minted tokens back to the sender
    tx.transferObjects([mintedCoin], address);

    await prepareMultisigTx(tx, 'mainnet', address);
};

mintData();
