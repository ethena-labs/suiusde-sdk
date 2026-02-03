/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/


/**
 * A module that includes all "permissionless" public functionality supported by
 * the smart contract.
 * 
 * Initially, this is responsible for the replenishment flows.
 */

import { type Transaction } from '@mysten/sui/transactions';
import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
export interface ReplenishArguments {
    treasury: RawTransactionArgument<string>;
    coin: RawTransactionArgument<string>;
}
export interface ReplenishOptions {
    package?: string;
    arguments: ReplenishArguments | [
        treasury: RawTransactionArgument<string>,
        coin: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
/** We can permissionless-ly fund the collateral of type C. */
export function replenish(options: ReplenishOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::treasury::Treasury`,
        `0x0000000000000000000000000000000000000000000000000000000000000002::coin::Coin<${options.typeArguments[0]}>`
    ] satisfies string[];
    const parameterNames = ["treasury", "coin"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'permissionless',
        function: 'replenish',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface ReplenishReceivingArguments {
    treasury: RawTransactionArgument<string>;
    receiving: RawTransactionArgument<string>;
}
export interface ReplenishReceivingOptions {
    package?: string;
    arguments: ReplenishReceivingArguments | [
        treasury: RawTransactionArgument<string>,
        receiving: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
/**
 * We can also do a "receive + merge" operation, if we can only do direct transfers
 * from the custodian.
 */
export function replenishReceiving(options: ReplenishReceivingOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::treasury::Treasury`,
        `0x0000000000000000000000000000000000000000000000000000000000000002::transfer::Receiving<0x0000000000000000000000000000000000000000000000000000000000000002::coin::Coin<${options.typeArguments[0]}>>`
    ] satisfies string[];
    const parameterNames = ["treasury", "receiving"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'permissionless',
        function: 'replenish_receiving',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface NewOracleProofArguments {
    oracle: RawTransactionArgument<string>;
}
export interface NewOracleProofOptions {
    package?: string;
    arguments: NewOracleProofArguments | [
        oracle: RawTransactionArgument<string>
    ];
}
/** Get a new oracle commitment, that can be filled when committing prices */
export function newOracleProof(options: NewOracleProofOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::aggregated_oracle::AggregatedOracle`
    ] satisfies string[];
    const parameterNames = ["oracle"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'permissionless',
        function: 'new_oracle_proof',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface CommitPythPriceArguments {
    oracle: RawTransactionArgument<string>;
    infoObject: RawTransactionArgument<string>;
    proof: RawTransactionArgument<string>;
}
export interface CommitPythPriceOptions {
    package?: string;
    arguments: CommitPythPriceArguments | [
        oracle: RawTransactionArgument<string>,
        infoObject: RawTransactionArgument<string>,
        proof: RawTransactionArgument<string>
    ];
}
/** Commit Pyth price to the oracle. */
export function commitPythPrice(options: CommitPythPriceOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::aggregated_oracle::AggregatedOracle`,
        '0xabf837e98c26087cba0883c0a7a28326b1fa3c5e1e2c5abdb486f9e8f594c837::price_info::PriceInfoObject',
        `${packageAddress}::oracle_proof::OracleProof`,
        '0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock'
    ] satisfies string[];
    const parameterNames = ["oracle", "infoObject", "proof"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'permissionless',
        function: 'commit_pyth_price',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}