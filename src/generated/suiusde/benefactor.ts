/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { type Transaction } from "@mysten/sui/transactions";
import {
  normalizeMoveArguments,
  type RawTransactionArgument,
} from "../utils/index.js";
export interface MintArguments {
  treasury: RawTransactionArgument<string>;
  auth: RawTransactionArgument<string>;
  order: RawTransactionArgument<string>;
  proof: RawTransactionArgument<string>;
}
export interface MintOptions {
  package?: string;
  arguments:
    | MintArguments
    | [
        treasury: RawTransactionArgument<string>,
        auth: RawTransactionArgument<string>,
        order: RawTransactionArgument<string>,
        proof: RawTransactionArgument<string>,
      ];
  typeArguments: [string];
}
export function mint(options: MintOptions) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::treasury::Treasury`,
    `${packageAddress}::auth::Auth<${packageAddress}::roles::BenefactorRole>`,
    `${packageAddress}::order::Order<${options.typeArguments[0]}>`,
    "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    `${packageAddress}::oracle_proof::OracleProof`,
  ] satisfies string[];
  const parameterNames = ["treasury", "auth", "order", "proof"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "benefactor",
      function: "mint",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
      typeArguments: options.typeArguments,
    });
}
export interface RedeemArguments {
  treasury: RawTransactionArgument<string>;
  auth: RawTransactionArgument<string>;
  order: RawTransactionArgument<string>;
  proof: RawTransactionArgument<string>;
}
export interface RedeemOptions {
  package?: string;
  arguments:
    | RedeemArguments
    | [
        treasury: RawTransactionArgument<string>,
        auth: RawTransactionArgument<string>,
        order: RawTransactionArgument<string>,
        proof: RawTransactionArgument<string>,
      ];
  typeArguments: [string];
}
export function redeem(options: RedeemOptions) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::treasury::Treasury`,
    `${packageAddress}::auth::Auth<${packageAddress}::roles::BenefactorRole>`,
    `${packageAddress}::order::Order<${packageAddress}::sui_usde::SUI_USDE>`,
    "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    `${packageAddress}::oracle_proof::OracleProof`,
  ] satisfies string[];
  const parameterNames = ["treasury", "auth", "order", "proof"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "benefactor",
      function: "redeem",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
      typeArguments: options.typeArguments,
    });
}
