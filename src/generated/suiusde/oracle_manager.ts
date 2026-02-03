/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { MoveTuple, normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
const $moduleName = '@suiusde/suiusde::oracle_manager';
export const OracleManagerRole = new MoveTuple({ name: `${$moduleName}::OracleManagerRole`, fields: [bcs.bool()] });
export interface NewOracleArguments {
    _: RawTransactionArgument<string>;
    minimumSources: RawTransactionArgument<number>;
    maxAgeMs: RawTransactionArgument<number | bigint>;
    minPrice: RawTransactionArgument<number | bigint>;
    maxPrice: RawTransactionArgument<number | bigint>;
}
export interface NewOracleOptions {
    package?: string;
    arguments: NewOracleArguments | [
        _: RawTransactionArgument<string>,
        minimumSources: RawTransactionArgument<number>,
        maxAgeMs: RawTransactionArgument<number | bigint>,
        minPrice: RawTransactionArgument<number | bigint>,
        maxPrice: RawTransactionArgument<number | bigint>
    ];
}
export function newOracle(options: NewOracleOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::auth::Auth<${packageAddress}::oracle_manager::OracleManagerRole>`,
        'u8',
        'u64',
        'u64',
        'u64'
    ] satisfies string[];
    const parameterNames = ["_", "minimumSources", "maxAgeMs", "minPrice", "maxPrice"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'oracle_manager',
        function: 'new_oracle',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface SetPythConfidenceBpsArguments {
    oracle: RawTransactionArgument<string>;
    _: RawTransactionArgument<string>;
    maxConfBps: RawTransactionArgument<number>;
}
export interface SetPythConfidenceBpsOptions {
    package?: string;
    arguments: SetPythConfidenceBpsArguments | [
        oracle: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        maxConfBps: RawTransactionArgument<number>
    ];
}
export function setPythConfidenceBps(options: SetPythConfidenceBpsOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::aggregated_oracle::AggregatedOracle`,
        `${packageAddress}::auth::Auth<${packageAddress}::oracle_manager::OracleManagerRole>`,
        'u16'
    ] satisfies string[];
    const parameterNames = ["oracle", "_", "maxConfBps"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'oracle_manager',
        function: 'set_pyth_confidence_bps',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface SetOracleMinimumSourcesArguments {
    oracle: RawTransactionArgument<string>;
    _: RawTransactionArgument<string>;
    minimumSources: RawTransactionArgument<number>;
}
export interface SetOracleMinimumSourcesOptions {
    package?: string;
    arguments: SetOracleMinimumSourcesArguments | [
        oracle: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        minimumSources: RawTransactionArgument<number>
    ];
}
export function setOracleMinimumSources(options: SetOracleMinimumSourcesOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::aggregated_oracle::AggregatedOracle`,
        `${packageAddress}::auth::Auth<${packageAddress}::oracle_manager::OracleManagerRole>`,
        'u8'
    ] satisfies string[];
    const parameterNames = ["oracle", "_", "minimumSources"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'oracle_manager',
        function: 'set_oracle_minimum_sources',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface AddOracleFeedArguments {
    oracle: RawTransactionArgument<string>;
    _: RawTransactionArgument<string>;
    feedIdentifier: RawTransactionArgument<string>;
    feedId: RawTransactionArgument<number[]>;
}
export interface AddOracleFeedOptions {
    package?: string;
    arguments: AddOracleFeedArguments | [
        oracle: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        feedIdentifier: RawTransactionArgument<string>,
        feedId: RawTransactionArgument<number[]>
    ];
}
export function addOracleFeed(options: AddOracleFeedOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::aggregated_oracle::AggregatedOracle`,
        `${packageAddress}::auth::Auth<${packageAddress}::oracle_manager::OracleManagerRole>`,
        '0x0000000000000000000000000000000000000000000000000000000000000001::string::String',
        'vector<u8>'
    ] satisfies string[];
    const parameterNames = ["oracle", "_", "feedIdentifier", "feedId"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'oracle_manager',
        function: 'add_oracle_feed',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface RemoveOracleFeedArguments {
    oracle: RawTransactionArgument<string>;
    _: RawTransactionArgument<string>;
    feedIdentifier: RawTransactionArgument<string>;
}
export interface RemoveOracleFeedOptions {
    package?: string;
    arguments: RemoveOracleFeedArguments | [
        oracle: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        feedIdentifier: RawTransactionArgument<string>
    ];
}
export function removeOracleFeed(options: RemoveOracleFeedOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::aggregated_oracle::AggregatedOracle`,
        `${packageAddress}::auth::Auth<${packageAddress}::oracle_manager::OracleManagerRole>`,
        '0x0000000000000000000000000000000000000000000000000000000000000001::string::String'
    ] satisfies string[];
    const parameterNames = ["oracle", "_", "feedIdentifier"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'oracle_manager',
        function: 'remove_oracle_feed',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface SetOracleMinPriceArguments {
    oracle: RawTransactionArgument<string>;
    _: RawTransactionArgument<string>;
    minPrice: RawTransactionArgument<number | bigint>;
}
export interface SetOracleMinPriceOptions {
    package?: string;
    arguments: SetOracleMinPriceArguments | [
        oracle: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        minPrice: RawTransactionArgument<number | bigint>
    ];
}
export function setOracleMinPrice(options: SetOracleMinPriceOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::aggregated_oracle::AggregatedOracle`,
        `${packageAddress}::auth::Auth<${packageAddress}::oracle_manager::OracleManagerRole>`,
        'u64'
    ] satisfies string[];
    const parameterNames = ["oracle", "_", "minPrice"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'oracle_manager',
        function: 'set_oracle_min_price',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface SetOracleMaxPriceArguments {
    oracle: RawTransactionArgument<string>;
    _: RawTransactionArgument<string>;
    maxPrice: RawTransactionArgument<number | bigint>;
}
export interface SetOracleMaxPriceOptions {
    package?: string;
    arguments: SetOracleMaxPriceArguments | [
        oracle: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        maxPrice: RawTransactionArgument<number | bigint>
    ];
}
export function setOracleMaxPrice(options: SetOracleMaxPriceOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::aggregated_oracle::AggregatedOracle`,
        `${packageAddress}::auth::Auth<${packageAddress}::oracle_manager::OracleManagerRole>`,
        'u64'
    ] satisfies string[];
    const parameterNames = ["oracle", "_", "maxPrice"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'oracle_manager',
        function: 'set_oracle_max_price',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface SetOracleMaxAgeMsArguments {
    oracle: RawTransactionArgument<string>;
    _: RawTransactionArgument<string>;
    maxAgeMs: RawTransactionArgument<number | bigint>;
}
export interface SetOracleMaxAgeMsOptions {
    package?: string;
    arguments: SetOracleMaxAgeMsArguments | [
        oracle: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        maxAgeMs: RawTransactionArgument<number | bigint>
    ];
}
export function setOracleMaxAgeMs(options: SetOracleMaxAgeMsOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::aggregated_oracle::AggregatedOracle`,
        `${packageAddress}::auth::Auth<${packageAddress}::oracle_manager::OracleManagerRole>`,
        'u64'
    ] satisfies string[];
    const parameterNames = ["oracle", "_", "maxAgeMs"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'oracle_manager',
        function: 'set_oracle_max_age_ms',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}