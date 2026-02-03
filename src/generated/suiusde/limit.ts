/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
const $moduleName = '@suiusde/suiusde::limit';
export const Limit = new MoveStruct({ name: `${$moduleName}::Limit`, fields: {
        /** the maximum mint */
        max_mint: bcs.u64(),
        /** the maximum redeem */
        max_redeem: bcs.u64()
    } });
export interface NewArguments {
    maxMint: RawTransactionArgument<number | bigint>;
    maxRedeem: RawTransactionArgument<number | bigint>;
}
export interface NewOptions {
    package?: string;
    arguments: NewArguments | [
        maxMint: RawTransactionArgument<number | bigint>,
        maxRedeem: RawTransactionArgument<number | bigint>
    ];
}
/** Create a new limit. */
export function _new(options: NewOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        'u64',
        'u64'
    ] satisfies string[];
    const parameterNames = ["maxMint", "maxRedeem"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'limit',
        function: 'new',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface MaxMintArguments {
    limit: RawTransactionArgument<string>;
}
export interface MaxMintOptions {
    package?: string;
    arguments: MaxMintArguments | [
        limit: RawTransactionArgument<string>
    ];
}
export function maxMint(options: MaxMintOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::limit::Limit`
    ] satisfies string[];
    const parameterNames = ["limit"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'limit',
        function: 'max_mint',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface MaxRedeemArguments {
    limit: RawTransactionArgument<string>;
}
export interface MaxRedeemOptions {
    package?: string;
    arguments: MaxRedeemArguments | [
        limit: RawTransactionArgument<string>
    ];
}
export function maxRedeem(options: MaxRedeemOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::limit::Limit`
    ] satisfies string[];
    const parameterNames = ["limit"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'limit',
        function: 'max_redeem',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface SetMaxMintArguments {
    limit: RawTransactionArgument<string>;
    maxMint: RawTransactionArgument<number | bigint>;
}
export interface SetMaxMintOptions {
    package?: string;
    arguments: SetMaxMintArguments | [
        limit: RawTransactionArgument<string>,
        maxMint: RawTransactionArgument<number | bigint>
    ];
}
export function setMaxMint(options: SetMaxMintOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::limit::Limit`,
        'u64'
    ] satisfies string[];
    const parameterNames = ["limit", "maxMint"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'limit',
        function: 'set_max_mint',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface SetMaxRedeemArguments {
    limit: RawTransactionArgument<string>;
    maxRedeem: RawTransactionArgument<number | bigint>;
}
export interface SetMaxRedeemOptions {
    package?: string;
    arguments: SetMaxRedeemArguments | [
        limit: RawTransactionArgument<string>,
        maxRedeem: RawTransactionArgument<number | bigint>
    ];
}
export function setMaxRedeem(options: SetMaxRedeemOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::limit::Limit`,
        'u64'
    ] satisfies string[];
    const parameterNames = ["limit", "maxRedeem"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'limit',
        function: 'set_max_redeem',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}