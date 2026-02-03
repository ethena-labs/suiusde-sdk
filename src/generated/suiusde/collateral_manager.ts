/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/


/** The role of the collateral manager is to enable collaterals. */

import { MoveTuple, normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
const $moduleName = '@suiusde/suiusde::collateral_manager';
export const CollateralManagerRole = new MoveTuple({ name: `${$moduleName}::CollateralManagerRole`, fields: [bcs.bool()] });
export interface AddCollateralArguments {
    treasury: RawTransactionArgument<string>;
    _: RawTransactionArgument<string>;
    config: RawTransactionArgument<string>;
}
export interface AddCollateralOptions {
    package?: string;
    arguments: AddCollateralArguments | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        config: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
/** A collateral manager can add a new collateral object. */
export function addCollateral(options: AddCollateralOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::treasury::Treasury`,
        `${packageAddress}::auth::Auth<${packageAddress}::collateral_manager::CollateralManagerRole>`,
        `${packageAddress}::collateral_config::CollateralConfig<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["treasury", "_", "config"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'collateral_manager',
        function: 'add_collateral',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface RemoveCollateralArguments {
    treasury: RawTransactionArgument<string>;
    _: RawTransactionArgument<string>;
}
export interface RemoveCollateralOptions {
    package?: string;
    arguments: RemoveCollateralArguments | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
/** A collateral manager can remove a collateral from the system completely. */
export function removeCollateral(options: RemoveCollateralOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::treasury::Treasury`,
        `${packageAddress}::auth::Auth<${packageAddress}::collateral_manager::CollateralManagerRole>`
    ] satisfies string[];
    const parameterNames = ["treasury", "_"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'collateral_manager',
        function: 'remove_collateral',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface SetCollateralLimitsArguments {
    treasury: RawTransactionArgument<string>;
    _: RawTransactionArgument<string>;
    limits: RawTransactionArgument<string>;
}
export interface SetCollateralLimitsOptions {
    package?: string;
    arguments: SetCollateralLimitsArguments | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        limits: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
/** A collateral manager can set the limits for a collateral. */
export function setCollateralLimits(options: SetCollateralLimitsOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::treasury::Treasury`,
        `${packageAddress}::auth::Auth<${packageAddress}::collateral_manager::CollateralManagerRole>`,
        `${packageAddress}::limits::Limits`
    ] satisfies string[];
    const parameterNames = ["treasury", "_", "limits"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'collateral_manager',
        function: 'set_collateral_limits',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface SetCollateralDefaultFeesArguments {
    treasury: RawTransactionArgument<string>;
    _: RawTransactionArgument<string>;
    fees: RawTransactionArgument<string>;
}
export interface SetCollateralDefaultFeesOptions {
    package?: string;
    arguments: SetCollateralDefaultFeesArguments | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        fees: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
export function setCollateralDefaultFees(options: SetCollateralDefaultFeesOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::treasury::Treasury`,
        `${packageAddress}::auth::Auth<${packageAddress}::collateral_manager::CollateralManagerRole>`,
        `${packageAddress}::collateral_fee::CollateralFee`
    ] satisfies string[];
    const parameterNames = ["treasury", "_", "fees"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'collateral_manager',
        function: 'set_collateral_default_fees',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface TransferToCustodyArguments {
    treasury: RawTransactionArgument<string>;
    _: RawTransactionArgument<string>;
    amount: RawTransactionArgument<number | bigint>;
}
export interface TransferToCustodyOptions {
    package?: string;
    arguments: TransferToCustodyArguments | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        amount: RawTransactionArgument<number | bigint>
    ];
    typeArguments: [
        string
    ];
}
/** Allows transferring funds from "redeemable_balance" to the custody address. */
export function transferToCustody(options: TransferToCustodyOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::treasury::Treasury`,
        `${packageAddress}::auth::Auth<${packageAddress}::collateral_manager::CollateralManagerRole>`,
        'u64'
    ] satisfies string[];
    const parameterNames = ["treasury", "_", "amount"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'collateral_manager',
        function: 'transfer_to_custody',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface SetCustodianAddressArguments {
    treasury: RawTransactionArgument<string>;
    _: RawTransactionArgument<string>;
    addr: RawTransactionArgument<string>;
}
export interface SetCustodianAddressOptions {
    package?: string;
    arguments: SetCustodianAddressArguments | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        addr: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
export function setCustodianAddress(options: SetCustodianAddressOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::treasury::Treasury`,
        `${packageAddress}::auth::Auth<${packageAddress}::collateral_manager::CollateralManagerRole>`,
        'address'
    ] satisfies string[];
    const parameterNames = ["treasury", "_", "addr"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'collateral_manager',
        function: 'set_custodian_address',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface SetCollateralMinPriceArguments {
    treasury: RawTransactionArgument<string>;
    _: RawTransactionArgument<string>;
    minPrice: RawTransactionArgument<number | bigint>;
}
export interface SetCollateralMinPriceOptions {
    package?: string;
    arguments: SetCollateralMinPriceArguments | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        minPrice: RawTransactionArgument<number | bigint>
    ];
    typeArguments: [
        string
    ];
}
export function setCollateralMinPrice(options: SetCollateralMinPriceOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::treasury::Treasury`,
        `${packageAddress}::auth::Auth<${packageAddress}::collateral_manager::CollateralManagerRole>`,
        'u64'
    ] satisfies string[];
    const parameterNames = ["treasury", "_", "minPrice"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'collateral_manager',
        function: 'set_collateral_min_price',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface SetCollateralMaxPriceArguments {
    treasury: RawTransactionArgument<string>;
    _: RawTransactionArgument<string>;
    maxPrice: RawTransactionArgument<number | bigint>;
}
export interface SetCollateralMaxPriceOptions {
    package?: string;
    arguments: SetCollateralMaxPriceArguments | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        maxPrice: RawTransactionArgument<number | bigint>
    ];
    typeArguments: [
        string
    ];
}
export function setCollateralMaxPrice(options: SetCollateralMaxPriceOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::treasury::Treasury`,
        `${packageAddress}::auth::Auth<${packageAddress}::collateral_manager::CollateralManagerRole>`,
        'u64'
    ] satisfies string[];
    const parameterNames = ["treasury", "_", "maxPrice"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'collateral_manager',
        function: 'set_collateral_max_price',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface SetCollateralMaxAgeMsArguments {
    treasury: RawTransactionArgument<string>;
    _: RawTransactionArgument<string>;
    maxAgeMs: RawTransactionArgument<number | bigint>;
}
export interface SetCollateralMaxAgeMsOptions {
    package?: string;
    arguments: SetCollateralMaxAgeMsArguments | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        maxAgeMs: RawTransactionArgument<number | bigint>
    ];
    typeArguments: [
        string
    ];
}
export function setCollateralMaxAgeMs(options: SetCollateralMaxAgeMsOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::treasury::Treasury`,
        `${packageAddress}::auth::Auth<${packageAddress}::collateral_manager::CollateralManagerRole>`,
        'u64'
    ] satisfies string[];
    const parameterNames = ["treasury", "_", "maxAgeMs"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'collateral_manager',
        function: 'set_collateral_max_age_ms',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface SetCollateralOracleArguments {
    treasury: RawTransactionArgument<string>;
    _: RawTransactionArgument<string>;
    oracle: RawTransactionArgument<string>;
}
export interface SetCollateralOracleOptions {
    package?: string;
    arguments: SetCollateralOracleArguments | [
        treasury: RawTransactionArgument<string>,
        _: RawTransactionArgument<string>,
        oracle: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
export function setCollateralOracle(options: SetCollateralOracleOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::treasury::Treasury`,
        `${packageAddress}::auth::Auth<${packageAddress}::collateral_manager::CollateralManagerRole>`,
        `${packageAddress}::aggregated_oracle::AggregatedOracle`
    ] satisfies string[];
    const parameterNames = ["treasury", "_", "oracle"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'collateral_manager',
        function: 'set_collateral_oracle',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}