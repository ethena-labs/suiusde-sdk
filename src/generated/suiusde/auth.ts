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
const $moduleName = "@suiusde/suiusde::auth";
export const Auth = new MoveTuple({
  name: `${$moduleName}::Auth`,
  fields: [bcs.Address],
});
export interface NewAuthArguments {
  treasury: RawTransactionArgument<string>;
}
export interface NewAuthOptions {
  package?: string;
  arguments: NewAuthArguments | [treasury: RawTransactionArgument<string>];
  typeArguments: [string];
}
/**
 * When authenticating, we issue an `AuthProof` object, which allows us to call
 * functions without worrying about validating per call.
 *
 * Having a proof of role (e.g. AuthProof<PegManager>), allows us to introduce
 * type-safety in role functionality.
 */
export function newAuth(options: NewAuthOptions) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::treasury::Treasury`,
  ] satisfies string[];
  const parameterNames = ["treasury"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "auth",
      function: "new_auth",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
      typeArguments: options.typeArguments,
    });
}
export interface AddrArguments {
  auth: RawTransactionArgument<string>;
}
export interface AddrOptions {
  package?: string;
  arguments: AddrArguments | [auth: RawTransactionArgument<string>];
  typeArguments: [string];
}
/** Get the authorized address. */
export function addr(options: AddrOptions) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::auth::Auth<${options.typeArguments[0]}>`,
  ] satisfies string[];
  const parameterNames = ["auth"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "auth",
      function: "addr",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
      typeArguments: options.typeArguments,
    });
}
