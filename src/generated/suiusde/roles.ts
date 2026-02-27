/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { MoveTuple, MoveStruct } from "../utils/index.js";
import { bcs } from "@mysten/sui/bcs";
import * as bag from "./deps/sui/bag.js";
const $moduleName = "@suiusde/suiusde::roles";
export const AdminRole = new MoveTuple({
  name: `${$moduleName}::AdminRole`,
  fields: [bcs.bool()],
});
export const BenefactorRole = new MoveTuple({
  name: `${$moduleName}::BenefactorRole`,
  fields: [bcs.bool()],
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
