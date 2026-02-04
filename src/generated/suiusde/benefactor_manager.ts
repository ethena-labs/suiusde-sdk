/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/

/**
 * The role of the benefactor disabler is to turn a benefactor off in case of
 * emergency.
 */

import {
  MoveTuple,
  normalizeMoveArguments,
  type RawTransactionArgument,
} from "../utils/index.js";
import { bcs } from "@mysten/sui/bcs";
import { type Transaction } from "@mysten/sui/transactions";
const $moduleName = "@suiusde/suiusde::benefactor_manager";
export const BenefactorManagerRole = new MoveTuple({
  name: `${$moduleName}::BenefactorManagerRole`,
  fields: [bcs.bool()],
});
export interface AddBenefactorArguments {
  treasury: RawTransactionArgument<string>;
  _: RawTransactionArgument<string>;
  addr: RawTransactionArgument<string>;
  limits: RawTransactionArgument<string>;
}
export interface AddBenefactorOptions {
  package?: string;
  arguments:
    | AddBenefactorArguments
    | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        addr: RawTransactionArgument<string>,
        limits: RawTransactionArgument<string>,
      ];
}
/** A benefactor manager can add a new benefactor. */
export function addBenefactor(options: AddBenefactorOptions) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::treasury::Treasury`,
    `${packageAddress}::auth::Auth<${packageAddress}::benefactor_manager::BenefactorManagerRole>`,
    "address",
    `${packageAddress}::limits::Limits`,
  ] satisfies string[];
  const parameterNames = ["treasury", "_", "addr", "limits"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "benefactor_manager",
      function: "add_benefactor",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
    });
}
export interface RemoveBenefactorArguments {
  treasury: RawTransactionArgument<string>;
  _: RawTransactionArgument<string>;
  addr: RawTransactionArgument<string>;
}
export interface RemoveBenefactorOptions {
  package?: string;
  arguments:
    | RemoveBenefactorArguments
    | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        addr: RawTransactionArgument<string>,
      ];
}
/** A benefactor manager can remove a benefactor. */
export function removeBenefactor(options: RemoveBenefactorOptions) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::treasury::Treasury`,
    `${packageAddress}::auth::Auth<${packageAddress}::benefactor_manager::BenefactorManagerRole>`,
    "address",
  ] satisfies string[];
  const parameterNames = ["treasury", "_", "addr"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "benefactor_manager",
      function: "remove_benefactor",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
    });
}
export interface SetBenefactorMaxMintPerEpochArguments {
  treasury: RawTransactionArgument<string>;
  _: RawTransactionArgument<string>;
  addr: RawTransactionArgument<string>;
  maxMint: RawTransactionArgument<number | bigint>;
}
export interface SetBenefactorMaxMintPerEpochOptions {
  package?: string;
  arguments:
    | SetBenefactorMaxMintPerEpochArguments
    | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        addr: RawTransactionArgument<string>,
        maxMint: RawTransactionArgument<number | bigint>,
      ];
}
/** A benefactor manager can update the configuration for a benefactor. */
export function setBenefactorMaxMintPerEpoch(
  options: SetBenefactorMaxMintPerEpochOptions,
) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::treasury::Treasury`,
    `${packageAddress}::auth::Auth<${packageAddress}::benefactor_manager::BenefactorManagerRole>`,
    "address",
    "u64",
  ] satisfies string[];
  const parameterNames = ["treasury", "_", "addr", "maxMint"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "benefactor_manager",
      function: "set_benefactor_max_mint_per_epoch",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
    });
}
export interface SetBenefactorMaxRedeemPerEpochArguments {
  treasury: RawTransactionArgument<string>;
  _: RawTransactionArgument<string>;
  addr: RawTransactionArgument<string>;
  maxRedeem: RawTransactionArgument<number | bigint>;
}
export interface SetBenefactorMaxRedeemPerEpochOptions {
  package?: string;
  arguments:
    | SetBenefactorMaxRedeemPerEpochArguments
    | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        addr: RawTransactionArgument<string>,
        maxRedeem: RawTransactionArgument<number | bigint>,
      ];
}
/** Set the maximum redemption amount per epoch. */
export function setBenefactorMaxRedeemPerEpoch(
  options: SetBenefactorMaxRedeemPerEpochOptions,
) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::treasury::Treasury`,
    `${packageAddress}::auth::Auth<${packageAddress}::benefactor_manager::BenefactorManagerRole>`,
    "address",
    "u64",
  ] satisfies string[];
  const parameterNames = ["treasury", "_", "addr", "maxRedeem"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "benefactor_manager",
      function: "set_benefactor_max_redeem_per_epoch",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
    });
}
export interface SetBenefactorMaxMintPerPeriodArguments {
  treasury: RawTransactionArgument<string>;
  _: RawTransactionArgument<string>;
  addr: RawTransactionArgument<string>;
  maxMint: RawTransactionArgument<number | bigint>;
}
export interface SetBenefactorMaxMintPerPeriodOptions {
  package?: string;
  arguments:
    | SetBenefactorMaxMintPerPeriodArguments
    | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        addr: RawTransactionArgument<string>,
        maxMint: RawTransactionArgument<number | bigint>,
      ];
}
/** Set the maximum mint amount per period. */
export function setBenefactorMaxMintPerPeriod(
  options: SetBenefactorMaxMintPerPeriodOptions,
) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::treasury::Treasury`,
    `${packageAddress}::auth::Auth<${packageAddress}::benefactor_manager::BenefactorManagerRole>`,
    "address",
    "u64",
  ] satisfies string[];
  const parameterNames = ["treasury", "_", "addr", "maxMint"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "benefactor_manager",
      function: "set_benefactor_max_mint_per_period",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
    });
}
export interface SetBenefactorMaxRedeemPerPeriodArguments {
  treasury: RawTransactionArgument<string>;
  _: RawTransactionArgument<string>;
  addr: RawTransactionArgument<string>;
  maxRedeem: RawTransactionArgument<number | bigint>;
}
export interface SetBenefactorMaxRedeemPerPeriodOptions {
  package?: string;
  arguments:
    | SetBenefactorMaxRedeemPerPeriodArguments
    | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        addr: RawTransactionArgument<string>,
        maxRedeem: RawTransactionArgument<number | bigint>,
      ];
}
/** Set the maximum redemption amount per period. */
export function setBenefactorMaxRedeemPerPeriod(
  options: SetBenefactorMaxRedeemPerPeriodOptions,
) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::treasury::Treasury`,
    `${packageAddress}::auth::Auth<${packageAddress}::benefactor_manager::BenefactorManagerRole>`,
    "address",
    "u64",
  ] satisfies string[];
  const parameterNames = ["treasury", "_", "addr", "maxRedeem"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "benefactor_manager",
      function: "set_benefactor_max_redeem_per_period",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
    });
}
export interface SetBenefactorMintFeeArguments {
  treasury: RawTransactionArgument<string>;
  _: RawTransactionArgument<string>;
  addr: RawTransactionArgument<string>;
  fee: RawTransactionArgument<number>;
}
export interface SetBenefactorMintFeeOptions {
  package?: string;
  arguments:
    | SetBenefactorMintFeeArguments
    | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        addr: RawTransactionArgument<string>,
        fee: RawTransactionArgument<number>,
      ];
  typeArguments: [string];
}
/** Set the fee for minting using collateral type. Fee is in BPS (basis points) */
export function setBenefactorMintFee(options: SetBenefactorMintFeeOptions) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::treasury::Treasury`,
    `${packageAddress}::auth::Auth<${packageAddress}::benefactor_manager::BenefactorManagerRole>`,
    "address",
    "u16",
  ] satisfies string[];
  const parameterNames = ["treasury", "_", "addr", "fee"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "benefactor_manager",
      function: "set_benefactor_mint_fee",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
      typeArguments: options.typeArguments,
    });
}
export interface SetBenefactorRedeemFeeArguments {
  treasury: RawTransactionArgument<string>;
  _: RawTransactionArgument<string>;
  addr: RawTransactionArgument<string>;
  fee: RawTransactionArgument<number>;
}
export interface SetBenefactorRedeemFeeOptions {
  package?: string;
  arguments:
    | SetBenefactorRedeemFeeArguments
    | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        addr: RawTransactionArgument<string>,
        fee: RawTransactionArgument<number>,
      ];
  typeArguments: [string];
}
/** Set the fee for redeeming Fee is in BPS (basis points) */
export function setBenefactorRedeemFee(options: SetBenefactorRedeemFeeOptions) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::treasury::Treasury`,
    `${packageAddress}::auth::Auth<${packageAddress}::benefactor_manager::BenefactorManagerRole>`,
    "address",
    "u16",
  ] satisfies string[];
  const parameterNames = ["treasury", "_", "addr", "fee"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "benefactor_manager",
      function: "set_benefactor_redeem_fee",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
      typeArguments: options.typeArguments,
    });
}
export interface SetBenefactorExemptMintFeeArguments {
  treasury: RawTransactionArgument<string>;
  _: RawTransactionArgument<string>;
  addr: RawTransactionArgument<string>;
}
export interface SetBenefactorExemptMintFeeOptions {
  package?: string;
  arguments:
    | SetBenefactorExemptMintFeeArguments
    | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        addr: RawTransactionArgument<string>,
      ];
  typeArguments: [string];
}
/** Enable/disable the exemption to mint fees */
export function setBenefactorExemptMintFee(
  options: SetBenefactorExemptMintFeeOptions,
) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::treasury::Treasury`,
    `${packageAddress}::auth::Auth<${packageAddress}::benefactor_manager::BenefactorManagerRole>`,
    "address",
  ] satisfies string[];
  const parameterNames = ["treasury", "_", "addr"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "benefactor_manager",
      function: "set_benefactor_exempt_mint_fee",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
      typeArguments: options.typeArguments,
    });
}
export interface SetBenefactorExemptRedeemFeeArguments {
  treasury: RawTransactionArgument<string>;
  _: RawTransactionArgument<string>;
  addr: RawTransactionArgument<string>;
}
export interface SetBenefactorExemptRedeemFeeOptions {
  package?: string;
  arguments:
    | SetBenefactorExemptRedeemFeeArguments
    | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        addr: RawTransactionArgument<string>,
      ];
  typeArguments: [string];
}
/** Enable/disalbe the exemption to redeem fees */
export function setBenefactorExemptRedeemFee(
  options: SetBenefactorExemptRedeemFeeOptions,
) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::treasury::Treasury`,
    `${packageAddress}::auth::Auth<${packageAddress}::benefactor_manager::BenefactorManagerRole>`,
    "address",
  ] satisfies string[];
  const parameterNames = ["treasury", "_", "addr"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "benefactor_manager",
      function: "set_benefactor_exempt_redeem_fee",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
      typeArguments: options.typeArguments,
    });
}
