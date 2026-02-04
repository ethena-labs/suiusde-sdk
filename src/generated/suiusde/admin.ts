/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { type Transaction } from "@mysten/sui/transactions";
import {
  normalizeMoveArguments,
  type RawTransactionArgument,
} from "../utils/index.js";
export interface EnableMintRedeemArguments {
  treasury: RawTransactionArgument<string>;
  _: RawTransactionArgument<string>;
}
export interface EnableMintRedeemOptions {
  package?: string;
  arguments:
    | EnableMintRedeemArguments
    | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
      ];
}
/** An admin can re-enable mint-redeems. */
export function enableMintRedeem(options: EnableMintRedeemOptions) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::treasury::Treasury`,
    `${packageAddress}::auth::Auth<${packageAddress}::roles::AdminRole>`,
  ] satisfies string[];
  const parameterNames = ["treasury", "_"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "admin",
      function: "enable_mint_redeem",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
    });
}
export interface EnableCollateralArguments {
  treasury: RawTransactionArgument<string>;
  _: RawTransactionArgument<string>;
}
export interface EnableCollateralOptions {
  package?: string;
  arguments:
    | EnableCollateralArguments
    | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
      ];
  typeArguments: [string];
}
/**
 * An admin can enable a collateral after it has been disabled by a collateral
 * disabler.
 */
export function enableCollateral(options: EnableCollateralOptions) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::treasury::Treasury`,
    `${packageAddress}::auth::Auth<${packageAddress}::roles::AdminRole>`,
  ] satisfies string[];
  const parameterNames = ["treasury", "_"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "admin",
      function: "enable_collateral",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
      typeArguments: options.typeArguments,
    });
}
export interface EnableBenefactorArguments {
  treasury: RawTransactionArgument<string>;
  _: RawTransactionArgument<string>;
  addr: RawTransactionArgument<string>;
}
export interface EnableBenefactorOptions {
  package?: string;
  arguments:
    | EnableBenefactorArguments
    | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        addr: RawTransactionArgument<string>,
      ];
}
/** Enable a benefactor that has been disabled. */
export function enableBenefactor(options: EnableBenefactorOptions) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::treasury::Treasury`,
    `${packageAddress}::auth::Auth<${packageAddress}::roles::AdminRole>`,
    "address",
  ] satisfies string[];
  const parameterNames = ["treasury", "_", "addr"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "admin",
      function: "enable_benefactor",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
    });
}
export interface AuthorizeRoleArguments {
  treasury: RawTransactionArgument<string>;
  _: RawTransactionArgument<string>;
  addr: RawTransactionArgument<string>;
}
export interface AuthorizeRoleOptions {
  package?: string;
  arguments:
    | AuthorizeRoleArguments
    | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        addr: RawTransactionArgument<string>,
      ];
  typeArguments: [string];
}
/** Authorize an address with role `R`. */
export function authorizeRole(options: AuthorizeRoleOptions) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::treasury::Treasury`,
    `${packageAddress}::auth::Auth<${packageAddress}::roles::AdminRole>`,
    "address",
  ] satisfies string[];
  const parameterNames = ["treasury", "_", "addr"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "admin",
      function: "authorize_role",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
      typeArguments: options.typeArguments,
    });
}
export interface DeauthorizeRoleArguments {
  treasury: RawTransactionArgument<string>;
  _: RawTransactionArgument<string>;
  addr: RawTransactionArgument<string>;
}
export interface DeauthorizeRoleOptions {
  package?: string;
  arguments:
    | DeauthorizeRoleArguments
    | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        addr: RawTransactionArgument<string>,
      ];
  typeArguments: [string];
}
/** Deauthorize an address from having the role `R`. */
export function deauthorizeRole(options: DeauthorizeRoleOptions) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::treasury::Treasury`,
    `${packageAddress}::auth::Auth<${packageAddress}::roles::AdminRole>`,
    "address",
  ] satisfies string[];
  const parameterNames = ["treasury", "_", "addr"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "admin",
      function: "deauthorize_role",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
      typeArguments: options.typeArguments,
    });
}
export interface SetVersionArguments {
  treasury: RawTransactionArgument<string>;
  version: RawTransactionArgument<number | bigint>;
}
export interface SetVersionOptions {
  package?: string;
  arguments:
    | SetVersionArguments
    | [
        treasury: RawTransactionArgument<string>,
        version: RawTransactionArgument<number | bigint>,
      ];
}
/**
 * Allows the admin to change the "version" (breaking) that is valid for the
 * contract. Unlike other methods, this one can be executed without version checks,
 * to prevent getting locked.
 */
export function setVersion(options: SetVersionOptions) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::treasury::Treasury`,
    "u64",
  ] satisfies string[];
  const parameterNames = ["treasury", "version"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "admin",
      function: "set_version",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
    });
}
