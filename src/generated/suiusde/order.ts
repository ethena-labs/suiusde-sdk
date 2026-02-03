/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import * as coin from './deps/sui/coin.js';
const $moduleName = '@suiusde/suiusde::order';
export const Order = new MoveStruct({ name: `${$moduleName}::Order`, fields: {
        coin: coin.Coin,
        expiry_ms: bcs.u64(),
        min_amount_out: bcs.u64(),
        nonce: bcs.string()
    } });
export interface NewArguments {
    coin: RawTransactionArgument<string>;
    expiryMs: RawTransactionArgument<number | bigint>;
    minAmountOut: RawTransactionArgument<number | bigint>;
    nonce: RawTransactionArgument<string>;
}
export interface NewOptions {
    package?: string;
    arguments: NewArguments | [
        coin: RawTransactionArgument<string>,
        expiryMs: RawTransactionArgument<number | bigint>,
        minAmountOut: RawTransactionArgument<number | bigint>,
        nonce: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
export function _new(options: NewOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `0x0000000000000000000000000000000000000000000000000000000000000002::coin::Coin<${options.typeArguments[0]}>`,
        'u64',
        'u64',
        '0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
        '0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock'
    ] satisfies string[];
    const parameterNames = ["coin", "expiryMs", "minAmountOut", "nonce"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'order',
        function: 'new',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface AssertCanExecuteArguments {
    order: RawTransactionArgument<string>;
}
export interface AssertCanExecuteOptions {
    package?: string;
    arguments: AssertCanExecuteArguments | [
        order: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
export function assertCanExecute(options: AssertCanExecuteOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::order::Order<${options.typeArguments[0]}>`,
        '0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock'
    ] satisfies string[];
    const parameterNames = ["order"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'order',
        function: 'assert_can_execute',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface ExpiryMsArguments {
    order: RawTransactionArgument<string>;
}
export interface ExpiryMsOptions {
    package?: string;
    arguments: ExpiryMsArguments | [
        order: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
export function expiryMs(options: ExpiryMsOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::order::Order<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["order"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'order',
        function: 'expiry_ms',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface MinAmountOutArguments {
    settings: RawTransactionArgument<string>;
}
export interface MinAmountOutOptions {
    package?: string;
    arguments: MinAmountOutArguments | [
        settings: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
export function minAmountOut(options: MinAmountOutOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::order::Order<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["settings"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'order',
        function: 'min_amount_out',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface NonceArguments {
    settings: RawTransactionArgument<string>;
}
export interface NonceOptions {
    package?: string;
    arguments: NonceArguments | [
        settings: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
export function nonce(options: NonceOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::order::Order<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["settings"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'order',
        function: 'nonce',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface AmountInArguments {
    order: RawTransactionArgument<string>;
}
export interface AmountInOptions {
    package?: string;
    arguments: AmountInArguments | [
        order: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
export function amountIn(options: AmountInOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::order::Order<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["order"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'order',
        function: 'amount_in',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}