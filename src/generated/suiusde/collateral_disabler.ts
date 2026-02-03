/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/


/**
 * The role of the collateral disabler is to disable a collateral in case of
 * emergency.
 */

import { MoveTuple, normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
const $moduleName = '@suiusde/suiusde::collateral_disabler';
export const CollateralDisablerRole = new MoveTuple({ name: `${$moduleName}::CollateralDisablerRole`, fields: [bcs.bool()] });
export interface DisableCollateralArguments {
    treasury: RawTransactionArgument<string>;
    _: RawTransactionArgument<string>;
}
export interface DisableCollateralOptions {
    package?: string;
    arguments: DisableCollateralArguments | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
/** A collateral disabler can disable a collateral. */
export function disableCollateral(options: DisableCollateralOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::treasury::Treasury`,
        `${packageAddress}::auth::Auth<${packageAddress}::collateral_disabler::CollateralDisablerRole>`
    ] satisfies string[];
    const parameterNames = ["treasury", "_"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'collateral_disabler',
        function: 'disable_collateral',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}