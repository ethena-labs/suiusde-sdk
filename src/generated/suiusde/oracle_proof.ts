/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { MoveStruct, MoveEnum } from "../utils/index.js";
import { bcs } from "@mysten/sui/bcs";
import * as vec_map from "./deps/sui/vec_map.js";
import * as vec_set from "./deps/sui/vec_set.js";
const $moduleName = "@suiusde/suiusde::oracle_proof";
export const OraclePrice = new MoveStruct({
  name: `${$moduleName}::OraclePrice`,
  fields: {
    identifier: bcs.string(),
    price: bcs.u64(),
    timestamp_ms: bcs.u64(),
  },
});
/**
 * We save the price + timestamp, or an indicator that the committed price was
 * invalid.
 */
export const CommittedOraclePrice = new MoveEnum({
  name: `${$moduleName}::CommittedOraclePrice`,
  fields: {
    Invalid: null,
    Valid: OraclePrice,
  },
});
export const OracleProof = new MoveStruct({
  name: `${$moduleName}::OracleProof`,
  fields: {
    oracle_id: bcs.Address,
    prices: vec_map.VecMap(bcs.string(), CommittedOraclePrice),
    expected_feeds: vec_set.VecSet(bcs.string()),
    minimum_sources: bcs.u8(),
  },
});
