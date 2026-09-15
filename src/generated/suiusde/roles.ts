/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { MoveStruct } from "../utils/index.js";
import { bcs } from "@mysten/sui/bcs";
import * as bag from "./deps/sui/bag.js";
const $moduleName = "@suiusde/suiusde::roles";
export const AdminRole = new MoveStruct({
  name: `${$moduleName}::AdminRole`,
  fields: {
    dummy_field: bcs.bool(),
  },
});
export const BenefactorRole = new MoveStruct({
  name: `${$moduleName}::BenefactorRole`,
  fields: {
    dummy_field: bcs.bool(),
  },
});
export const Roles = new MoveStruct({
  name: `${$moduleName}::Roles`,
  fields: {
    data: bag.Bag,
    admin_count: bcs.u64(),
  },
});
export const Role = new MoveStruct({
  name: `${$moduleName}::Role`,
  fields: {
    addr: bcs.Address,
  },
});
