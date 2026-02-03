/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import * as limiter from './limiter.js';
import * as limits from './limits.js';
import * as object from './deps/sui/object.js';
const $moduleName = '@suiusde/suiusde::config';
export const Config = new MoveStruct({ name: `${$moduleName}::Config`, fields: {
        /** Whether mint/redeem can be executed. This can be paused by the appropriate role. */
        is_mint_redeem_enabled: bcs.bool(),
        /**
         * The `breaking version` of a contract. Any code that had a lower constant version
         * cannot be called.
         */
        version: bcs.u64(),
        /** The current epoch duration in ms */
        epoch_duration_ms: bcs.u64(),
        /** The current period duration in ms. */
        period_duration_ms: bcs.u64(),
        /** The global limiter for the treasury. */
        limiter: limiter.Limiter,
        /** The default limits for a benefactor on epochs/periods for mint/redeems. */
        default_benefactor_limits: limits.Limits,
        /** The value of the asset in USD. Should be in 6 decimals. */
        peg_price: bcs.u64(),
        /** Storing extra fields if we decide to expand the contract in the future. */
        extra_storage: object.UID
    } });
export interface NewArguments {
    epochDurationMs: RawTransactionArgument<number | bigint>;
    periodDurationMs: RawTransactionArgument<number | bigint>;
    globalLimits: RawTransactionArgument<string>;
    defaultBenefactorLimits: RawTransactionArgument<string>;
    pegPrice: RawTransactionArgument<number | bigint>;
}
export interface NewOptions {
    package?: string;
    arguments: NewArguments | [
        epochDurationMs: RawTransactionArgument<number | bigint>,
        periodDurationMs: RawTransactionArgument<number | bigint>,
        globalLimits: RawTransactionArgument<string>,
        defaultBenefactorLimits: RawTransactionArgument<string>,
        pegPrice: RawTransactionArgument<number | bigint>
    ];
}
export function _new(options: NewOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        'u64',
        'u64',
        `${packageAddress}::limits::Limits`,
        `${packageAddress}::limits::Limits`,
        'u64'
    ] satisfies string[];
    const parameterNames = ["epochDurationMs", "periodDurationMs", "globalLimits", "defaultBenefactorLimits", "pegPrice"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'config',
        function: 'new',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
