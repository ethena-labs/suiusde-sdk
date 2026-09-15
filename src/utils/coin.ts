import type { SuiGrpcClient } from "@mysten/sui/grpc";
import type {
  Transaction,
  TransactionObjectArgument,
} from "@mysten/sui/transactions";

/**
 * Fetches coins of a given type and returns a single coin with the specified amount.
 * If multiple coins exist, they are merged first, then split.
 */
export async function getCoin(
  tx: Transaction,
  client: SuiGrpcClient,
  owner: string,
  amount: bigint,
  coinType: string,
): Promise<TransactionObjectArgument> {
  // Fetch all coins of the specified type owned by the address
  const coins = await client.listCoins({
    owner,
    coinType,
  });

  if (coins.objects.length === 0) {
    throw new Error(`No coins of type ${coinType} found for address ${owner}`);
  }

  // Calculate total balance
  const totalBalance = coins.objects.reduce(
    (sum, coin) => sum + BigInt(coin.balance),
    0n,
  );

  if (totalBalance < amount) {
    throw new Error(
      `Insufficient balance. Required: ${amount}, Available: ${totalBalance}`,
    );
  }

  const [primaryCoin, ...otherCoins] = coins.objects;

  // If we have multiple coins, merge them first
  if (otherCoins.length > 0) {
    tx.mergeCoins(
      tx.object(primaryCoin!.objectId),
      otherCoins.map((c) => tx.object(c.objectId)),
    );
  }

  // Split the exact amount we need
  const [splitCoin] = tx.splitCoins(tx.object(primaryCoin!.objectId), [
    tx.pure.u64(amount),
  ]);

  return splitCoin;
}
