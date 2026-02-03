/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import { type Transaction } from '@mysten/sui/transactions';
import * as limit from './limit.js';
const $moduleName = '@suiusde/suiusde::limits';
export const Limits = new MoveStruct({ name: `${$moduleName}::Limits`, fields: {
        /** the limits for the epoch */
        epoch: limit.Limit,
        /** the limits for the period */
        period: limit.Limit
    } });
export interface NewArguments {
    epoch: RawTransactionArgument<string>;
    period: RawTransactionArgument<string>;
}
export interface NewOptions {
    package?: string;
    arguments: NewArguments | [
        epoch: RawTransactionArgument<string>,
        period: RawTransactionArgument<string>
    ];
}
export function _new(options: NewOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::limit::Limit`,
        `${packageAddress}::limit::Limit`
    ] satisfies string[];
    const parameterNames = ["epoch", "period"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'limits',
        function: 'new',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface DefaultOptions {
    package?: string;
    arguments?: [
    ];
}
/** returns empty limits. Can be used for default, in the benefactor case. */
export function _default(options: DefaultOptions = {}) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'limits',
        function: 'default',
    });
}
export interface EpochArguments {
    limits: RawTransactionArgument<string>;
}
export interface EpochOptions {
    package?: string;
    arguments: EpochArguments | [
        limits: RawTransactionArgument<string>
    ];
}
export function epoch(options: EpochOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::limits::Limits`
    ] satisfies string[];
    const parameterNames = ["limits"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'limits',
        function: 'epoch',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface PeriodArguments {
    limits: RawTransactionArgument<string>;
}
export interface PeriodOptions {
    package?: string;
    arguments: PeriodArguments | [
        limits: RawTransactionArgument<string>
    ];
}
export function period(options: PeriodOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::limits::Limits`
    ] satisfies string[];
    const parameterNames = ["limits"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'limits',
        function: 'period',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface EpochMutArguments {
    limits: RawTransactionArgument<string>;
}
export interface EpochMutOptions {
    package?: string;
    arguments: EpochMutArguments | [
        limits: RawTransactionArgument<string>
    ];
}
export function epochMut(options: EpochMutOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::limits::Limits`
    ] satisfies string[];
    const parameterNames = ["limits"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'limits',
        function: 'epoch_mut',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface PeriodMutArguments {
    limits: RawTransactionArgument<string>;
}
export interface PeriodMutOptions {
    package?: string;
    arguments: PeriodMutArguments | [
        limits: RawTransactionArgument<string>
    ];
}
export function periodMut(options: PeriodMutOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::limits::Limits`
    ] satisfies string[];
    const parameterNames = ["limits"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'limits',
        function: 'period_mut',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface SetEpochLimitArguments {
    limits: RawTransactionArgument<string>;
    epoch: RawTransactionArgument<string>;
}
export interface SetEpochLimitOptions {
    package?: string;
    arguments: SetEpochLimitArguments | [
        limits: RawTransactionArgument<string>,
        epoch: RawTransactionArgument<string>
    ];
}
export function setEpochLimit(options: SetEpochLimitOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::limits::Limits`,
        `${packageAddress}::limit::Limit`
    ] satisfies string[];
    const parameterNames = ["limits", "epoch"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'limits',
        function: 'set_epoch_limit',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface SetPeriodLimitArguments {
    limits: RawTransactionArgument<string>;
    period: RawTransactionArgument<string>;
}
export interface SetPeriodLimitOptions {
    package?: string;
    arguments: SetPeriodLimitArguments | [
        limits: RawTransactionArgument<string>,
        period: RawTransactionArgument<string>
    ];
}
export function setPeriodLimit(options: SetPeriodLimitOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::limits::Limits`,
        `${packageAddress}::limit::Limit`
    ] satisfies string[];
    const parameterNames = ["limits", "period"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'limits',
        function: 'set_period_limit',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}