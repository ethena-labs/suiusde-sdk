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
const $moduleName = "@suiusde/suiusde::collateral_fee";
export const CollateralFee = new MoveStruct({
  name: `${$moduleName}::CollateralFee`,
  fields: {
    mint: bcs.option(bcs.u16()),
    redeem: bcs.option(bcs.u16()),
  },
});
export interface NewArguments {
  mint: RawTransactionArgument<number | null>;
  redeem: RawTransactionArgument<number | null>;
}
export interface NewOptions {
  package?: string;
  arguments:
    | NewArguments
    | [
        mint: RawTransactionArgument<number | null>,
        redeem: RawTransactionArgument<number | null>,
      ];
}
/** Custom configuration for the fees. Fees are in BPS (basis points) */
export function _new(options: NewOptions) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u16>",
    "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u16>",
  ] satisfies string[];
  const parameterNames = ["mint", "redeem"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "collateral_fee",
      function: "new",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
    });
}
export interface NewWithDefaultOptions {
  package?: string;
  arguments?: [];
}
/** Default fees are 0 on both. */
export function newWithDefault(options: NewWithDefaultOptions = {}) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "collateral_fee",
      function: "new_with_default",
    });
}
export interface NewExemptOptions {
  package?: string;
  arguments?: [];
}
export function newExempt(options: NewExemptOptions = {}) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "collateral_fee",
      function: "new_exempt",
    });
}
export interface MintFeeArguments {
  fee: RawTransactionArgument<string>;
}
export interface MintFeeOptions {
  package?: string;
  arguments: MintFeeArguments | [fee: RawTransactionArgument<string>];
}
/** Returns the mint fee in BPS (basis points) */
export function mintFee(options: MintFeeOptions) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::collateral_fee::CollateralFee`,
  ] satisfies string[];
  const parameterNames = ["fee"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "collateral_fee",
      function: "mint_fee",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
    });
}
export interface RedeemFeeArguments {
  fee: RawTransactionArgument<string>;
}
export interface RedeemFeeOptions {
  package?: string;
  arguments: RedeemFeeArguments | [fee: RawTransactionArgument<string>];
}
/** Returns the redeem fee in BPS (basis points) */
export function redeemFee(options: RedeemFeeOptions) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::collateral_fee::CollateralFee`,
  ] satisfies string[];
  const parameterNames = ["fee"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "collateral_fee",
      function: "redeem_fee",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
    });
}
export interface IsMintFeeExemptArguments {
  fee: RawTransactionArgument<string>;
}
export interface IsMintFeeExemptOptions {
  package?: string;
  arguments: IsMintFeeExemptArguments | [fee: RawTransactionArgument<string>];
}
export function isMintFeeExempt(options: IsMintFeeExemptOptions) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::collateral_fee::CollateralFee`,
  ] satisfies string[];
  const parameterNames = ["fee"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "collateral_fee",
      function: "is_mint_fee_exempt",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
    });
}
export interface IsRedeemFeeExemptArguments {
  fee: RawTransactionArgument<string>;
}
export interface IsRedeemFeeExemptOptions {
  package?: string;
  arguments: IsRedeemFeeExemptArguments | [fee: RawTransactionArgument<string>];
}
export function isRedeemFeeExempt(options: IsRedeemFeeExemptOptions) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::collateral_fee::CollateralFee`,
  ] satisfies string[];
  const parameterNames = ["fee"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "collateral_fee",
      function: "is_redeem_fee_exempt",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
    });
}
export interface UseDefaultMintFeesArguments {
  fee: RawTransactionArgument<string>;
}
export interface UseDefaultMintFeesOptions {
  package?: string;
  arguments:
    | UseDefaultMintFeesArguments
    | [fee: RawTransactionArgument<string>];
}
export function useDefaultMintFees(options: UseDefaultMintFeesOptions) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::collateral_fee::CollateralFee`,
  ] satisfies string[];
  const parameterNames = ["fee"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "collateral_fee",
      function: "use_default_mint_fees",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
    });
}
export interface UseDefaultRedeemFeesArguments {
  fee: RawTransactionArgument<string>;
}
export interface UseDefaultRedeemFeesOptions {
  package?: string;
  arguments:
    | UseDefaultRedeemFeesArguments
    | [fee: RawTransactionArgument<string>];
}
export function useDefaultRedeemFees(options: UseDefaultRedeemFeesOptions) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::collateral_fee::CollateralFee`,
  ] satisfies string[];
  const parameterNames = ["fee"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "collateral_fee",
      function: "use_default_redeem_fees",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
    });
}
export interface SetMintFeeArguments {
  fee: RawTransactionArgument<string>;
  mint: RawTransactionArgument<number>;
}
export interface SetMintFeeOptions {
  package?: string;
  arguments:
    | SetMintFeeArguments
    | [
        fee: RawTransactionArgument<string>,
        mint: RawTransactionArgument<number>,
      ];
}
/** Set the mint fee in BPS (basis points) */
export function setMintFee(options: SetMintFeeOptions) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::collateral_fee::CollateralFee`,
    "u16",
  ] satisfies string[];
  const parameterNames = ["fee", "mint"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "collateral_fee",
      function: "set_mint_fee",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
    });
}
export interface SetRedeemFeeArguments {
  fee: RawTransactionArgument<string>;
  redeem: RawTransactionArgument<number>;
}
export interface SetRedeemFeeOptions {
  package?: string;
  arguments:
    | SetRedeemFeeArguments
    | [
        fee: RawTransactionArgument<string>,
        redeem: RawTransactionArgument<number>,
      ];
}
/** Set the redeem fee in BPS (basis points) */
export function setRedeemFee(options: SetRedeemFeeOptions) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::collateral_fee::CollateralFee`,
    "u16",
  ] satisfies string[];
  const parameterNames = ["fee", "redeem"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "collateral_fee",
      function: "set_redeem_fee",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
    });
}
export interface ApplyMintFeeExemptionArguments {
  fee: RawTransactionArgument<string>;
}
export interface ApplyMintFeeExemptionOptions {
  package?: string;
  arguments:
    | ApplyMintFeeExemptionArguments
    | [fee: RawTransactionArgument<string>];
}
export function applyMintFeeExemption(options: ApplyMintFeeExemptionOptions) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::collateral_fee::CollateralFee`,
  ] satisfies string[];
  const parameterNames = ["fee"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "collateral_fee",
      function: "apply_mint_fee_exemption",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
    });
}
export interface ApplyRedeemFeeExemptionArguments {
  fee: RawTransactionArgument<string>;
}
export interface ApplyRedeemFeeExemptionOptions {
  package?: string;
  arguments:
    | ApplyRedeemFeeExemptionArguments
    | [fee: RawTransactionArgument<string>];
}
export function applyRedeemFeeExemption(
  options: ApplyRedeemFeeExemptionOptions,
) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::collateral_fee::CollateralFee`,
  ] satisfies string[];
  const parameterNames = ["fee"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "collateral_fee",
      function: "apply_redeem_fee_exemption",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
    });
}
export interface ApplyDefaultMintFeeArguments {
  fee: RawTransactionArgument<string>;
}
export interface ApplyDefaultMintFeeOptions {
  package?: string;
  arguments:
    | ApplyDefaultMintFeeArguments
    | [fee: RawTransactionArgument<string>];
}
export function applyDefaultMintFee(options: ApplyDefaultMintFeeOptions) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::collateral_fee::CollateralFee`,
  ] satisfies string[];
  const parameterNames = ["fee"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "collateral_fee",
      function: "apply_default_mint_fee",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
    });
}
export interface ApplyDefaultRedeemFeeArguments {
  fee: RawTransactionArgument<string>;
}
export interface ApplyDefaultRedeemFeeOptions {
  package?: string;
  arguments:
    | ApplyDefaultRedeemFeeArguments
    | [fee: RawTransactionArgument<string>];
}
export function applyDefaultRedeemFee(options: ApplyDefaultRedeemFeeOptions) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::collateral_fee::CollateralFee`,
  ] satisfies string[];
  const parameterNames = ["fee"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "collateral_fee",
      function: "apply_default_redeem_fee",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
    });
}
export interface CalculateMintFeeArguments {
  fee: RawTransactionArgument<string>;
  defaultFee: RawTransactionArgument<string>;
}
export interface CalculateMintFeeOptions {
  package?: string;
  arguments:
    | CalculateMintFeeArguments
    | [
        fee: RawTransactionArgument<string>,
        defaultFee: RawTransactionArgument<string>,
      ];
}
export function calculateMintFee(options: CalculateMintFeeOptions) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::collateral_fee::CollateralFee`,
    `${packageAddress}::collateral_fee::CollateralFee`,
  ] satisfies string[];
  const parameterNames = ["fee", "defaultFee"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "collateral_fee",
      function: "calculate_mint_fee",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
    });
}
export interface CalculateRedeemFeeArguments {
  fee: RawTransactionArgument<string>;
  defaultFee: RawTransactionArgument<string>;
}
export interface CalculateRedeemFeeOptions {
  package?: string;
  arguments:
    | CalculateRedeemFeeArguments
    | [
        fee: RawTransactionArgument<string>,
        defaultFee: RawTransactionArgument<string>,
      ];
}
export function calculateRedeemFee(options: CalculateRedeemFeeOptions) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::collateral_fee::CollateralFee`,
    `${packageAddress}::collateral_fee::CollateralFee`,
  ] satisfies string[];
  const parameterNames = ["fee", "defaultFee"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "collateral_fee",
      function: "calculate_redeem_fee",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
    });
}
