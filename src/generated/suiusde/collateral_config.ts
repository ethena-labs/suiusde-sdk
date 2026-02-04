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
import * as balance from "./deps/sui/balance.js";
import * as limiter from "./limiter.js";
import * as collateral_fee from "./collateral_fee.js";
import * as oracle_limits from "./oracle_limits.js";
import * as object from "./deps/sui/object.js";
const $moduleName = "@suiusde/suiusde::collateral_config";
export const CollateralConfig = new MoveStruct({
  name: `${$moduleName}::CollateralConfig`,
  fields: {
    /** Whether the collateral is enabled. Can be disabled by the role. */
    enabled: bcs.bool(),
    /** The custodian addresses that receive the funds when mints occur. */
    custodian_address: bcs.Address,
    /** The balance that's available for immediate redemptions. */
    redeem_balance: balance.Balance,
    /** the limiter for the collateral type. */
    limiter: limiter.Limiter,
    /** The decimals that `C` has. Is used when registering the collateral. */
    decimals: bcs.u8(),
    /** The default fees for this collateral type. */
    default_fee: collateral_fee.CollateralFee,
    /** The oracle ID that we accept for this collateral. */
    oracle_id: bcs.Address,
    /** The limits for the oracle. */
    oracle_limits: oracle_limits.OracleLimits,
    /** For upgradeability */
    extra_storage: object.UID,
  },
});
export interface NewArguments {
  currency: RawTransactionArgument<string>;
  limits: RawTransactionArgument<string>;
  custodianAddress: RawTransactionArgument<string>;
  minOraclePrice: RawTransactionArgument<number | bigint>;
  maxOraclePrice: RawTransactionArgument<number | bigint>;
  maxOracleAge: RawTransactionArgument<number | bigint>;
  oracle: RawTransactionArgument<string>;
  defaultFee: RawTransactionArgument<string>;
}
export interface NewOptions {
  package?: string;
  arguments:
    | NewArguments
    | [
        currency: RawTransactionArgument<string>,
        limits: RawTransactionArgument<string>,
        custodianAddress: RawTransactionArgument<string>,
        minOraclePrice: RawTransactionArgument<number | bigint>,
        maxOraclePrice: RawTransactionArgument<number | bigint>,
        maxOracleAge: RawTransactionArgument<number | bigint>,
        oracle: RawTransactionArgument<string>,
        defaultFee: RawTransactionArgument<string>,
      ];
  typeArguments: [string];
}
/** Create a new collateral config. Verifies values against contract limits. */
export function _new(options: NewOptions) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `0x0000000000000000000000000000000000000000000000000000000000000002::coin_registry::Currency<${options.typeArguments[0]}>`,
    `${packageAddress}::limits::Limits`,
    "address",
    "u64",
    "u64",
    "u64",
    `${packageAddress}::aggregated_oracle::AggregatedOracle`,
    `${packageAddress}::collateral_fee::CollateralFee`,
  ] satisfies string[];
  const parameterNames = [
    "currency",
    "limits",
    "custodianAddress",
    "minOraclePrice",
    "maxOraclePrice",
    "maxOracleAge",
    "oracle",
    "defaultFee",
  ];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "collateral_config",
      function: "new",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
      typeArguments: options.typeArguments,
    });
}
