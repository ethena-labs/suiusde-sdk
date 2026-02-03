/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { MoveTuple, MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import * as object from './deps/sui/object.js';
import * as roles from './roles.js';
import * as coin from './deps/sui/coin.js';
import * as coin_registry from './deps/sui/coin_registry.js';
import * as config from './config.js';
import * as bag from './deps/sui/bag.js';
const $moduleName = '@suiusde/suiusde::treasury';
export const CollateralKey = new MoveTuple({ name: `${$moduleName}::CollateralKey`, fields: [bcs.bool()] });
export const TreasuryCapKey = new MoveTuple({ name: `${$moduleName}::TreasuryCapKey`, fields: [bcs.bool()] });
export const Treasury = new MoveStruct({ name: `${$moduleName}::Treasury`, fields: {
        id: object.UID,
        /** The roles for privileged operations in the treasury. */
        roles: roles.Roles,
        /** Storing the denycap for potential future usage. */
        deny_cap: coin.DenyCapV2,
        /** The `MetadataCap` in case we want to update metadata in the future */
        metadata_cap: coin_registry.MetadataCap,
        /** The global configuration object for the registry. */
        config: config.Config,
        /** The list of collaterals in the system. */
        collaterals: bag.Bag,
        /** The list of benefactors in the system. */
        benefactors: bag.Bag
    } });
export interface CreateArguments {
    cap: RawTransactionArgument<string>;
    denyCap: RawTransactionArgument<string>;
    metadataCap: RawTransactionArgument<string>;
    config: RawTransactionArgument<string>;
}
export interface CreateOptions {
    package?: string;
    arguments: CreateArguments | [
        cap: RawTransactionArgument<string>,
        denyCap: RawTransactionArgument<string>,
        metadataCap: RawTransactionArgument<string>,
        config: RawTransactionArgument<string>
    ];
}
/** Should be called when initializing the treasury. */
export function create(options: CreateOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `0x0000000000000000000000000000000000000000000000000000000000000002::coin::TreasuryCap<${packageAddress}::sui_usde::SUI_USDE>`,
        `0x0000000000000000000000000000000000000000000000000000000000000002::coin::DenyCapV2<${packageAddress}::sui_usde::SUI_USDE>`,
        `0x0000000000000000000000000000000000000000000000000000000000000002::coin_registry::MetadataCap<${packageAddress}::sui_usde::SUI_USDE>`,
        `${packageAddress}::config::Config`
    ] satisfies string[];
    const parameterNames = ["cap", "denyCap", "metadataCap", "config"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'treasury',
        function: 'create',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface ShareArguments {
    treasury: RawTransactionArgument<string>;
}
export interface ShareOptions {
    package?: string;
    arguments: ShareArguments | [
        treasury: RawTransactionArgument<string>
    ];
}
/** Allow finalizing the new creation */
export function share(options: ShareOptions) {
    const packageAddress = options.package ?? '@suiusde/suiusde';
    const argumentsTypes = [
        `${packageAddress}::treasury::Treasury`
    ] satisfies string[];
    const parameterNames = ["treasury"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'treasury',
        function: 'share',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}