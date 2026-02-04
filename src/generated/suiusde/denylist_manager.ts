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
const $moduleName = "@suiusde/suiusde::denylist_manager";
export const DenylistManagerRole = new MoveTuple({
  name: `${$moduleName}::DenylistManagerRole`,
  fields: [bcs.bool()],
});
export interface AddToDenylistArguments {
  treasury: RawTransactionArgument<string>;
  _: RawTransactionArgument<string>;
  addr: RawTransactionArgument<string>;
}
export interface AddToDenylistOptions {
  package?: string;
  arguments:
    | AddToDenylistArguments
    | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        addr: RawTransactionArgument<string>,
      ];
}
export function addToDenylist(options: AddToDenylistOptions) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::treasury::Treasury`,
    `${packageAddress}::auth::Auth<${packageAddress}::denylist_manager::DenylistManagerRole>`,
    "0x0000000000000000000000000000000000000000000000000000000000000002::deny_list::DenyList",
    "address",
  ] satisfies string[];
  const parameterNames = ["treasury", "_", "addr"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "denylist_manager",
      function: "add_to_denylist",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
    });
}
export interface RemoveFromDenylistArguments {
  treasury: RawTransactionArgument<string>;
  _: RawTransactionArgument<string>;
  addr: RawTransactionArgument<string>;
}
export interface RemoveFromDenylistOptions {
  package?: string;
  arguments:
    | RemoveFromDenylistArguments
    | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        addr: RawTransactionArgument<string>,
      ];
}
/** Remove address from denylist. */
export function removeFromDenylist(options: RemoveFromDenylistOptions) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::treasury::Treasury`,
    `${packageAddress}::auth::Auth<${packageAddress}::denylist_manager::DenylistManagerRole>`,
    "0x0000000000000000000000000000000000000000000000000000000000000002::deny_list::DenyList",
    "address",
  ] satisfies string[];
  const parameterNames = ["treasury", "_", "addr"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "denylist_manager",
      function: "remove_from_denylist",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
    });
}
