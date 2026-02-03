/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/


/**
 * Limiter is used to apply mint/redeem limits. There are limits that apply per
 * epoch/period and are stored in:
 * 
 * 1.  Global limits
 * 2.  Per collateral limits
 * 3.  Per benefactor limits
 */

import { MoveStruct } from '../utils/index.js';
import * as counter from './counter.js';
import * as limits from './limits.js';
const $moduleName = '@suiusde/suiusde::limiter';
export const Limiter = new MoveStruct({ name: `${$moduleName}::Limiter`, fields: {
        /** Counts mint/redeems per epoch */
        epoch_counter: counter.Counter,
        /** Counts mint/redeems per period */
        period_counter: counter.Counter,
        /** Stores the limits for these. */
        limits: limits.Limits
    } });
