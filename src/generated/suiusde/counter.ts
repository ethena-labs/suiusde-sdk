/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { MoveStruct } from '../utils/index.js';
import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
const $moduleName = '@suiusde/suiusde::counter';
export const Counter = new MoveStruct({ name: `${$moduleName}::Counter`, fields: {
        /**
           * The duration of the epoch/period in milliseconds. This is used to determine if
           * we need to roll over the epoch/period.
           */
        duration_ms: bcs.u64(),
        /** The epoch/period sequence number. */
        sequence_number: bcs.u64(),
        /** The amount that has been minted in the period. */
        minted: bcs.u64(),
        /** The amount that has been redeemed in the period. */
        redeemed: bcs.u64()
    } });
export interface DefaultOptions {
    package?: string;
    arguments?: [
    ];
}
/**
 * Create a "default" counter, uninitialized. Duration + sequence number will both
 * be initialized on the first rollover based on global config.
 */
export function _default(options: DefaultOptions = {}) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'counter',
        function: 'default',
    });
}