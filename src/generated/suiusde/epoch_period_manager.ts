/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import {
  MoveStruct,
  normalizeMoveArguments,
  type RawTransactionArgument,
} from "../utils/index.js";
import { bcs } from "@mysten/sui/bcs";
import { type Transaction } from "@mysten/sui/transactions";
const $moduleName = "@suiusde/suiusde::epoch_period_manager";
export const EpochPeriodManagerRole = new MoveStruct({
  name: `${$moduleName}::EpochPeriodManagerRole`,
  fields: {
    dummy_field: bcs.bool(),
  },
});
export interface SetGlobalEpochLimitsArguments {
  treasury: RawTransactionArgument<string>;
  _: RawTransactionArgument<string>;
  limit: RawTransactionArgument<string>;
}
export interface SetGlobalEpochLimitsOptions {
  package?: string;
  arguments:
    | SetGlobalEpochLimitsArguments
    | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        limit: RawTransactionArgument<string>,
      ];
}
/** Max mint/max redeem limits per epoch. */
export function setGlobalEpochLimits(options: SetGlobalEpochLimitsOptions) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::treasury::Treasury`,
    `${packageAddress}::auth::Auth<${packageAddress}::epoch_period_manager::EpochPeriodManagerRole>`,
    `${packageAddress}::limit::Limit`,
  ] satisfies string[];
  const parameterNames = ["treasury", "_", "limit"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "epoch_period_manager",
      function: "set_global_epoch_limits",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
    });
}
export interface SetGlobalPeriodLimitsArguments {
  treasury: RawTransactionArgument<string>;
  _: RawTransactionArgument<string>;
  limit: RawTransactionArgument<string>;
}
export interface SetGlobalPeriodLimitsOptions {
  package?: string;
  arguments:
    | SetGlobalPeriodLimitsArguments
    | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        limit: RawTransactionArgument<string>,
      ];
}
/** Max mint/max redeem limits per period. */
export function setGlobalPeriodLimits(options: SetGlobalPeriodLimitsOptions) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::treasury::Treasury`,
    `${packageAddress}::auth::Auth<${packageAddress}::epoch_period_manager::EpochPeriodManagerRole>`,
    `${packageAddress}::limit::Limit`,
  ] satisfies string[];
  const parameterNames = ["treasury", "_", "limit"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "epoch_period_manager",
      function: "set_global_period_limits",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
    });
}
export interface SetDefaultBenefactorMaxMintPerEpochArguments {
  treasury: RawTransactionArgument<string>;
  _: RawTransactionArgument<string>;
  maxMint: RawTransactionArgument<number | bigint>;
}
export interface SetDefaultBenefactorMaxMintPerEpochOptions {
  package?: string;
  arguments:
    | SetDefaultBenefactorMaxMintPerEpochArguments
    | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        maxMint: RawTransactionArgument<number | bigint>,
      ];
}
/** Set the default max mint per epoch for a benefactor */
export function setDefaultBenefactorMaxMintPerEpoch(
  options: SetDefaultBenefactorMaxMintPerEpochOptions,
) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::treasury::Treasury`,
    `${packageAddress}::auth::Auth<${packageAddress}::epoch_period_manager::EpochPeriodManagerRole>`,
    "u64",
  ] satisfies string[];
  const parameterNames = ["treasury", "_", "maxMint"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "epoch_period_manager",
      function: "set_default_benefactor_max_mint_per_epoch",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
    });
}
export interface SetDefaultBenefactorMaxRedeemPerEpochArguments {
  treasury: RawTransactionArgument<string>;
  _: RawTransactionArgument<string>;
  maxRedeem: RawTransactionArgument<number | bigint>;
}
export interface SetDefaultBenefactorMaxRedeemPerEpochOptions {
  package?: string;
  arguments:
    | SetDefaultBenefactorMaxRedeemPerEpochArguments
    | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        maxRedeem: RawTransactionArgument<number | bigint>,
      ];
}
/** Set the default max redeem per epoch for a benefactor */
export function setDefaultBenefactorMaxRedeemPerEpoch(
  options: SetDefaultBenefactorMaxRedeemPerEpochOptions,
) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::treasury::Treasury`,
    `${packageAddress}::auth::Auth<${packageAddress}::epoch_period_manager::EpochPeriodManagerRole>`,
    "u64",
  ] satisfies string[];
  const parameterNames = ["treasury", "_", "maxRedeem"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "epoch_period_manager",
      function: "set_default_benefactor_max_redeem_per_epoch",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
    });
}
export interface SetDefaultBenefactorMaxMintPerPeriodArguments {
  treasury: RawTransactionArgument<string>;
  _: RawTransactionArgument<string>;
  maxMint: RawTransactionArgument<number | bigint>;
}
export interface SetDefaultBenefactorMaxMintPerPeriodOptions {
  package?: string;
  arguments:
    | SetDefaultBenefactorMaxMintPerPeriodArguments
    | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        maxMint: RawTransactionArgument<number | bigint>,
      ];
}
/** Set the default max mint per period for a benefactor */
export function setDefaultBenefactorMaxMintPerPeriod(
  options: SetDefaultBenefactorMaxMintPerPeriodOptions,
) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::treasury::Treasury`,
    `${packageAddress}::auth::Auth<${packageAddress}::epoch_period_manager::EpochPeriodManagerRole>`,
    "u64",
  ] satisfies string[];
  const parameterNames = ["treasury", "_", "maxMint"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "epoch_period_manager",
      function: "set_default_benefactor_max_mint_per_period",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
    });
}
export interface SetDefaultBenefactorMaxRedeemPerPeriodArguments {
  treasury: RawTransactionArgument<string>;
  _: RawTransactionArgument<string>;
  maxRedeem: RawTransactionArgument<number | bigint>;
}
export interface SetDefaultBenefactorMaxRedeemPerPeriodOptions {
  package?: string;
  arguments:
    | SetDefaultBenefactorMaxRedeemPerPeriodArguments
    | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        maxRedeem: RawTransactionArgument<number | bigint>,
      ];
}
/** Set the default max redeem per period for a benefactor */
export function setDefaultBenefactorMaxRedeemPerPeriod(
  options: SetDefaultBenefactorMaxRedeemPerPeriodOptions,
) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::treasury::Treasury`,
    `${packageAddress}::auth::Auth<${packageAddress}::epoch_period_manager::EpochPeriodManagerRole>`,
    "u64",
  ] satisfies string[];
  const parameterNames = ["treasury", "_", "maxRedeem"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "epoch_period_manager",
      function: "set_default_benefactor_max_redeem_per_period",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
    });
}
export interface SetEpochDurationArguments {
  treasury: RawTransactionArgument<string>;
  _: RawTransactionArgument<string>;
  durationMs: RawTransactionArgument<number | bigint>;
}
export interface SetEpochDurationOptions {
  package?: string;
  arguments:
    | SetEpochDurationArguments
    | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        durationMs: RawTransactionArgument<number | bigint>,
      ];
}
/** Set the epoch duration */
export function setEpochDuration(options: SetEpochDurationOptions) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::treasury::Treasury`,
    `${packageAddress}::auth::Auth<${packageAddress}::epoch_period_manager::EpochPeriodManagerRole>`,
    "u64",
  ] satisfies string[];
  const parameterNames = ["treasury", "_", "durationMs"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "epoch_period_manager",
      function: "set_epoch_duration",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
    });
}
export interface SetPeriodDurationArguments {
  treasury: RawTransactionArgument<string>;
  _: RawTransactionArgument<string>;
  durationMs: RawTransactionArgument<number | bigint>;
}
export interface SetPeriodDurationOptions {
  package?: string;
  arguments:
    | SetPeriodDurationArguments
    | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        durationMs: RawTransactionArgument<number | bigint>,
      ];
}
/** Set the period duration */
export function setPeriodDuration(options: SetPeriodDurationOptions) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::treasury::Treasury`,
    `${packageAddress}::auth::Auth<${packageAddress}::epoch_period_manager::EpochPeriodManagerRole>`,
    "u64",
  ] satisfies string[];
  const parameterNames = ["treasury", "_", "durationMs"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "epoch_period_manager",
      function: "set_period_duration",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
    });
}
