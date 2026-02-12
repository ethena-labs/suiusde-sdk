import { Transaction } from "@mysten/sui/transactions";
import { MAINNET_CONSTANTS } from "./constants.js";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { prepareMultisigTx, signAndExecute } from "./utils/utils.js";
import { replenishReceiving } from "./generated/suiusde/permissionless.js";

const replenish = async () => {
    const multisigIndex = process.argv.indexOf("--multisig");
    const multisigAddress = multisigIndex !== -1 ? process.argv[multisigIndex + 1] : undefined;

    const coinIndex = process.argv.indexOf("--coin");
    const customCoinType = coinIndex !== -1 ? process.argv[coinIndex + 1] : undefined;

    const constants = MAINNET_CONSTANTS;
    const client = new SuiClient({ url: getFullnodeUrl("mainnet") });
    const coinType = customCoinType ?? constants.collaterals.usdc.type;
    const treasuryObjectId = constants.treasuryObjectId as string;

    // Fetch all USDC coin objects owned by the treasury
    let coins: { objectId: string }[] = [];
    let cursor: string | null | undefined = null;
    let hasNext = true;

    while (hasNext) {
        const response = await client.getOwnedObjects({
            owner: treasuryObjectId,
            filter: {
                StructType: `0x2::coin::Coin<${coinType}>`,
            },
            cursor,
        });

        coins.push(
            ...response.data
                .filter((obj) => obj.data)
                .map((obj) => ({ objectId: obj.data!.objectId }))
        );

        hasNext = response.hasNextPage;
        cursor = response.nextCursor;
    }

    if (coins.length === 0) {
        console.log("No pending replenishment.");
        return;
    }

    console.log(`Found ${coins.length} coin object(s) of type ${coinType} on the treasury.`);

    const tx = new Transaction();

    for (const coin of coins) {
        replenishReceiving({
            package: constants.package.latest,
            arguments: {
                treasury: treasuryObjectId,
                receiving: coin.objectId,
            },
            typeArguments: [coinType],
        })(tx);
    }

    if (multisigAddress) {
        await prepareMultisigTx(tx, "mainnet", multisigAddress);
    } else {
        const result = await signAndExecute(tx, "mainnet");
        console.dir(result.effects, { depth: null });
    }
};

replenish();