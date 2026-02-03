/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { MoveStruct } from '../utils/index.js';
import { bcs } from '@mysten/sui/bcs';
const $moduleName = '@suiusde/suiusde::oracle_limits';
export const OracleLimits = new MoveStruct({ name: `${$moduleName}::OracleLimits`, fields: {
        min_price: bcs.u64(),
        max_price: bcs.u64(),
        max_age_ms: bcs.u64()
    } });