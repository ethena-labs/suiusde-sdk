/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import {
  MoveStruct,
  MoveTuple,
  normalizeMoveArguments,
  type RawTransactionArgument,
} from "../utils/index.js";
import { bcs } from "@mysten/sui/bcs";
import { type Transaction } from "@mysten/sui/transactions";
import * as object from "./deps/sui/object.js";
import * as vec_map from "./deps/sui/vec_map.js";
import * as oracle_limits from "./oracle_limits.js";
const $moduleName = "@suiusde/suiusde::aggregated_oracle";
export const AggregatedOracle = new MoveStruct({
  name: `${$moduleName}::AggregatedOracle`,
  fields: {
    id: object.UID,
    /** Cannot accept prices when we have not reached the minimum sources. */
    minimum_sources: bcs.u8(),
    /** The IDs of accepted feeds per type. */
    oracle_feed_ids: vec_map.VecMap(bcs.string(), bcs.vector(bcs.u8())),
    /** The limits for the aggregated oracle. */
    limits: oracle_limits.OracleLimits,
  },
});
export const PythConfidenceBps = new MoveTuple({
  name: `${$moduleName}::PythConfidenceBps`,
  fields: [bcs.bool()],
});
export interface ShareArguments {
  oracle: RawTransactionArgument<string>;
}
export interface ShareOptions {
  package?: string;
  arguments: ShareArguments | [oracle: RawTransactionArgument<string>];
}
/** Sharing is ok to be public */
export function share(options: ShareOptions) {
  const packageAddress = options.package ?? "@suiusde/suiusde";
  const argumentsTypes = [
    `${packageAddress}::aggregated_oracle::AggregatedOracle`,
  ] satisfies string[];
  const parameterNames = ["oracle"];
  return (tx: Transaction) =>
    tx.moveCall({
      package: packageAddress,
      module: "aggregated_oracle",
      function: "share",
      arguments: normalizeMoveArguments(
        options.arguments,
        argumentsTypes,
        parameterNames,
      ),
    });
}
