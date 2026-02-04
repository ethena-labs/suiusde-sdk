/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import {
  MoveTuple,
  normalizeMoveArguments,
  type RawTransactionArgument,
} from "../utils/index.js";
import { bcs } from "@mysten/sui/bcs";
import { type Transaction } from "@mysten/sui/transactions";
const $moduleName = "@suiusde/suiusde::peg_manager";
export const PegManagerRole = new MoveTuple({
  name: `${$moduleName}::PegManagerRole`,
  fields: [bcs.bool()],
});
export interface SetPegPriceArguments {
  treasury: RawTransactionArgument<string>;
  _: RawTransactionArgument<string>;
  price: RawTransactionArgument<number | bigint>;
}
export interface SetPegPriceOptions {
  package?: string;
  arguments:
    | SetPegPriceArguments
    | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        price: RawTransactionArgument<number | bigint>,
      ];
}
/** Sets the peg price. */
export function setPegPrice(options: SetPegPriceOptions) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::treasury::Treasury`,
    `${packageAddress}::auth::Auth<${packageAddress}::peg_manager::PegManagerRole>`,
    "u64",
  ] satisfies string[];
  const parameterNames = ["treasury", "_", "price"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "peg_manager",
      function: "set_peg_price",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
    });
}
