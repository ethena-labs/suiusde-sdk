/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/

/**
 * Defines the `Coin` type - platform wide representation of fungible tokens and
 * coins. `Coin` can be described as a secure wrapper around `Balance` type.
 */

import { MoveStruct } from "../../../utils/index.js";
import { bcs } from "@mysten/sui/bcs";
import * as object from "./object.js";
import * as balance from "./balance.js";
const $moduleName = "0x2::coin";
export const Coin = new MoveStruct({
  name: `${$moduleName}::Coin`,
  fields: {
    id: object.UID,
    balance: balance.Balance,
  },
});
export const DenyCapV2 = new MoveStruct({
  name: `${$moduleName}::DenyCapV2`,
  fields: {
    id: object.UID,
    allow_global_pause: bcs.bool(),
  },
});
