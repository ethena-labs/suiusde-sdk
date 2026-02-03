/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { MoveStruct } from '../utils/index.js';
import { bcs } from '@mysten/sui/bcs';
import * as vec_map from './deps/sui/vec_map.js';
import * as type_name from './deps/std/type_name.js';
import * as collateral_fee from './collateral_fee.js';
import * as limiter from './limiter.js';
import * as table from './deps/sui/table.js';
const $moduleName = '@suiusde/suiusde::benefactor_config';
export const BenefactorConfig = new MoveStruct({ name: `${$moduleName}::BenefactorConfig`, fields: {
        /** Whether the benefactor is enabled. */
        enabled: bcs.bool(),
        /** The collateral fees (per collateral type). */
        collateral_fees: vec_map.VecMap(type_name.TypeName, collateral_fee.CollateralFee),
        /** The limiter for the benefactor. */
        limiter: limiter.Limiter,
        /** the nonces of the benefactor */
        nonces: table.Table
    } });
