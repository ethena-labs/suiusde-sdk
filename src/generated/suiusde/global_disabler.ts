/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/

/** The role of the global disabler is to disable mint-redeems in case of emergency. */

import {
  MoveStruct,
  normalizeMoveArguments,
  type RawTransactionArgument,
} from "../utils/index.js";
import { bcs } from "@mysten/sui/bcs";
import { type Transaction } from "@mysten/sui/transactions";
const $moduleName = "@suiusde/suiusde::global_disabler";
export const GlobalDisablerRole = new MoveStruct({
  name: `${$moduleName}::GlobalDisablerRole`,
  fields: {
    dummy_field: bcs.bool(),
  },
});
export interface DisableMintRedeemArguments {
  treasury: RawTransactionArgument<string>;
  _: RawTransactionArgument<string>;
}
export interface DisableMintRedeemOptions {
  package?: string;
  arguments:
    | DisableMintRedeemArguments
    | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
      ];
}
/** A global disabler can disable mint-redeems. */
export function disableMintRedeem(options: DisableMintRedeemOptions) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::treasury::Treasury`,
    `${packageAddress}::auth::Auth<${packageAddress}::global_disabler::GlobalDisablerRole>`,
  ] satisfies string[];
  const parameterNames = ["treasury", "_"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "global_disabler",
      function: "disable_mint_redeem",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
    });
}
