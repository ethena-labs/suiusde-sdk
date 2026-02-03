/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/


/**
 * The role of the benefactor disabler is to turn a benefactor off in case of
 * emergency.
 */

import { MoveTuple, normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
const $moduleName = '@suiusde/suiusde::benefactor_disabler';
export const BenefactorDisablerRole = new MoveTuple({ name: `${$moduleName}::BenefactorDisablerRole`, fields: [bcs.bool()] });
export interface DisableBenefactorArguments {
    treasury: RawTransactionArgument<string>;
    _: RawTransactionArgument<string>;
    addr: RawTransactionArgument<string>;
}
export interface DisableBenefactorOptions {
    package?: string;
    arguments: DisableBenefactorArguments | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        addr: RawTransactionArgument<string>
    ];
}
export function disableBenefactor(options: DisableBenefactorOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::treasury::Treasury`,
        `${packageAddress}::auth::Auth<${packageAddress}::benefactor_disabler::BenefactorDisablerRole>`,
        'address'
    ] satisfies string[];
    const parameterNames = ["treasury", "_", "addr"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'benefactor_disabler',
        function: 'disable_benefactor',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}