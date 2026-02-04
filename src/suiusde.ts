import { bcs } from "@mysten/sui/bcs";
import type { SuiClient } from "@mysten/sui/client";
import { Transaction, type TransactionObjectArgument, type TransactionResult } from "@mysten/sui/transactions";
import { deriveDynamicFieldID, deriveObjectID, fromHex, normalizeSuiAddress } from "@mysten/sui/utils";
import type { CollateralType, SuiUSDEOptions } from "./constants.js";
import { CollateralKey, Treasury } from "./generated/suiusde/treasury.js";

export type Limit = {
    /// The mint limit (6 decimals precision!)
    mint: number;
    /// The redeem limit (6 decimals precision!)
    redeem: number;
}

export type OrderOptions = {
    /// The coin to use for the order. If you are minting, you need to supply the collateral's coin type.
    /// If you are redeeming, you need to supply `SUIUSDE` token.
    coin: TransactionObjectArgument | string;
    /// The expiry time for the order (in milliseconds, has to be in the future)
    expiryMs: number;
    /// The minimum amount out for the order.
    /// For mints, the precision must be 6 decimals
    /// For redeems, the precision must match the precision of the collateral.
    minAmountOut: number;
    /// The nonce for the order. Must be unique.
    nonce: string;
    /// The collateral type to use for the order (on either direction)
    collateralKey: CollateralType;
    /// The oracle commitment proof value for the collateral
    oracleProof: TransactionResult
}

/// All the roles in the system, with the respective types.
const RoleTypes = ({ packageIdV1 }: { packageIdV1: string }) => {
    return {
        admin: `${packageIdV1}::roles::AdminRole`,
        benefactor: `${packageIdV1}::roles::BenefactorRole`,
        benefactorManager: `${packageIdV1}::benefactor_manager::BenefactorManagerRole`,
        benefactorDisabler: `${packageIdV1}::benefactor_disabler::BenefactorDisablerRole`,
        epochPeriodManager: `${packageIdV1}::epoch_period_manager::EpochPeriodManagerRole`,
        collateralDisabler: `${packageIdV1}::collateral_disabler::CollateralDisablerRole`,
        collateralManager: `${packageIdV1}::collateral_manager::CollateralManagerRole`,
        globalDisabler: `${packageIdV1}::global_disabler::GlobalDisablerRole`,
        pegManager: `${packageIdV1}::peg_manager::PegManagerRole`,
        denylistManager: `${packageIdV1}::denylist_manager::DenylistManagerRole`,
        oracleManager: `${packageIdV1}::oracle_manager::OracleManagerRole`,
    }
}

type Role = keyof ReturnType<typeof RoleTypes>;

export class SuiUSDE {
    options: SuiUSDEOptions;
    client: SuiClient;

    constructor(options: SuiUSDEOptions, client: SuiClient) {
        this.client = client;
        this.options = options;
    }
    
    getClient(): SuiClient {
        return this.client;
    }

    getBaseCoinType() {
        return `${this.options.package.v1}::sui_usde::SUI_USDE`;
    }

    // Get all roles in the system with their type arguments.
    getRoleTypes() {
        return RoleTypes({ packageIdV1: this.options.package.v1 });
    }

    async getTreasury() {
        if (!this.options.treasuryObjectId) throw new Error('Treasury object ID is not set. Please initialize it first!');
        const treasury = await this.client.getObject({ id: this.options.treasuryObjectId as string, options: { showBcs: true } });
        if (treasury.data?.bcs?.dataType !== 'moveObject') throw new Error('Expected a move object')

        const treasuryData = Treasury.fromBase64(treasury.data.bcs.bcsBytes);

        return {
            config: treasuryData.config,
            collateralsBagId: treasuryData.collaterals.id.id,
            rolesBagId: treasuryData.roles.data.id.id,
            benefactorsBagId: treasuryData.benefactors.id.id,
            totalAdmins: treasuryData.roles.admin_count,
        }
    }

    /** 
     * Returns an individual collateral's object data.
     * Can be used for querying current limits, available replenishment data etc.
     * */
    async queryCollateral(collateralKey: CollateralType) {
        const treasuryData = await this.getTreasury();

        const type = `${this.options.package.v1}::treasury::CollateralKey<${this.options.collaterals[collateralKey].type}>`;

        const collateralObjectId = deriveDynamicFieldID(treasuryData.collateralsBagId, type, CollateralKey.serialize([false]).toBytes());

        const result = await this.client.getObject({ id: collateralObjectId, options: { showContent: true } });

        if (result.data?.content?.dataType !== 'moveObject') throw new Error('Expected a move object');

        const content = (result.data.content.fields as any).value.fields;

        let limiter = {
            epochCounter: content.limiter.fields.epoch_counter.fields,
            periodCounter: content.limiter.fields.period_counter.fields,
            limits: {
                epoch: content.limiter.fields.limits.fields.epoch.fields,
                period: content.limiter.fields.limits.fields.period.fields,
            },
        }

        return {
            enabled: content.enabled,
            custodianAddress: content.custodian_address,
            redeemBalance: Number(content.redeem_balance),
            limiter,
            decimals: content.decimals,
            defaultFee: content.default_fee.fields,
            oracleId: content.oracle_id,
            oracleLimits: content.oracle_limits.fields,
            extraStorage: content.extra_storage,
        };
    }

    // Default decimals multiplier for the contract. Do not change!
    // Precision is 6 decimals.
    getDefaultDecimalsMultiplier() {
        return 1_000_000;
    }

    //  === Different transaction helpers ====

    // Get an Auth Proof for the specified role. 
    // Can be used in the PTBs to call privileged operations.
    newAuthProof(tx: Transaction, role: keyof ReturnType<typeof RoleTypes>) {
        return tx.moveCall({
            target: `${this.options.package.latest}::auth::new_auth`,
            arguments: [tx.object(this.options.treasuryObjectId)],
            typeArguments: [this.getRoleTypes()[role]],
        });
    }

    // Create a new limit (mint/redeem).
    // Precision MUST be in 6 decimals.
    newLimit(tx: Transaction, limit: Limit) {
        return tx.moveCall({
            target: `${this.options.package.latest}::limit::new`,
            arguments: [tx.pure.u64(limit.mint), tx.pure.u64(limit.redeem)],
        });
    }

    // Create new limits for the epoch and period (per mint/redeem)
    // Precision MUST be in 6 decimals.
    newLimits(tx: Transaction, limits: {
        epoch: Limit;
        period: Limit;
    }) {
        return tx.moveCall({
            target: `${this.options.package.latest}::limits::new`,
            arguments: [this.newLimit(tx, limits.epoch), this.newLimit(tx, limits.period)],
        });
    }

    newCollateralFee(tx: Transaction, fee: {
        mint: number; // bps
        redeem: number; // bps
    }) {
        // Validate fees
        if (fee.mint > 100 || fee.redeem > 100) {
            throw new Error('Fee must be less than 100 BPS (1%)');
        }

        if (fee.mint < 1 || fee.redeem < 1) {
            throw new Error('Fee must be greater than 0 BPS. Use `newCollateralFeeExempt` to create an exempt fee.');
        }

        return tx.moveCall({
            target: `${this.options.package.latest}::collateral_fee::new`,
            arguments: [tx.pure.option('u16', fee.mint), tx.pure.option('u16', fee.redeem)],
        });
    }

    oracleManagerActions(tx: Transaction) {
        return {
            newOracle: (options: {
                minimumSources: number;
                maxAgeMs: number;
                minPrice: number;
                maxPrice: number;
            }) => {
                const auth = this.newAuthProof(tx, 'oracleManager');
                return tx.moveCall({
                    target: `${this.options.package.latest}::oracle_manager::new_oracle`,
                    arguments: [auth, tx.pure.u8(options.minimumSources), tx.pure.u64(options.maxAgeMs), tx.pure.u64(options.minPrice), tx.pure.u64(options.maxPrice)],
                });
            },

            setOracleMinPrice: (oracleId: TransactionObjectArgument | string, minPrice: number) => {
                const auth = this.newAuthProof(tx, 'oracleManager');
                tx.moveCall({
                    target: `${this.options.package.latest}::oracle_manager::set_oracle_min_price`,
                    arguments: [tx.object(oracleId), auth, tx.pure.u64(minPrice)],
                });
            },
            setOracleMaxPrice: (oracleId: TransactionObjectArgument | string, maxPrice: number) => {
                const auth = this.newAuthProof(tx, 'oracleManager');
                tx.moveCall({
                    target: `${this.options.package.latest}::oracle_manager::set_oracle_max_price`,
                    arguments: [tx.object(oracleId), auth, tx.pure.u64(maxPrice)],
                });
            },
            setOracleMaxAgeMs: (oracleId: TransactionObjectArgument | string, maxAgeMs: number) => {
                const auth = this.newAuthProof(tx, 'oracleManager');
                tx.moveCall({
                    target: `${this.options.package.latest}::oracle_manager::set_oracle_max_age_ms`,
                    arguments: [tx.object(oracleId), auth, tx.pure.u64(maxAgeMs)],
                });
            },

            setOracleMinimumSources: (oracleId: TransactionObjectArgument | string, minimumSources: number) => {
                const auth = this.newAuthProof(tx, 'oracleManager');
                tx.moveCall({
                    target: `${this.options.package.latest}::oracle_manager::set_oracle_minimum_sources`,
                    arguments: [tx.object(oracleId), auth, tx.pure.u8(minimumSources)],
                });
            },
            setOraclePythConfidenceBps: (oracleId: TransactionObjectArgument | string, pythConfidenceBps: number) => {
                const auth = this.newAuthProof(tx, 'oracleManager');
                tx.moveCall({
                    target: `${this.options.package.latest}::oracle_manager::set_oracle_pyth_confidence_bps`,
                    arguments: [tx.object(oracleId), auth, tx.pure.u16(pythConfidenceBps)],
                });
            },

            // Adds a new oracle feed to the oracle.
            addOracleFeed: (oracleId: TransactionObjectArgument | string, feedIdentifier: string, feedId: Uint8Array) => {
                const auth = this.newAuthProof(tx, 'oracleManager');
                tx.moveCall({
                    target: `${this.options.package.latest}::oracle_manager::add_oracle_feed`,
                    arguments: [tx.object(oracleId), auth, tx.pure.string(feedIdentifier), tx.pure.vector('u8', feedId)],
                });
            },
            removeOracleFeed: (oracleId: TransactionObjectArgument | string, feedIdentifier: string) => {
                const auth = this.newAuthProof(tx, 'oracleManager');
                tx.moveCall({
                    target: `${this.options.package.latest}::oracle_manager::remove_oracle_feed`,
                    arguments: [tx.object(oracleId), auth, tx.pure.string(feedIdentifier)],
                });
            },
        }
    }

    // Get a list of peg manager actions.
    pegManagerActions(tx: Transaction) {
        return {
            // Sets the peg price. Precision MUST be in 6 decimals.
            setPegPrice: (price: number) => {
                const auth = this.newAuthProof(tx, 'pegManager');
                tx.moveCall({
                    target: `${this.options.package.latest}::peg_manager::set_peg_price`,
                    arguments: [tx.object(this.options.treasuryObjectId), auth, tx.pure.u64(price)],
                });
            }
        }
    }

    // Get a list of collateral disabler actions.
    collateralDisablerActions(tx: Transaction) {
        return {
            // Disables a collateral. Requires the type of the collateral (e.g. `0xfoo::usdc::USDC`)
            disableCollateral: (collateralKey: CollateralType) => {
                const auth = this.newAuthProof(tx, 'collateralDisabler');
                tx.moveCall({
                    target: `${this.options.package.latest}::collateral_disabler::disable_collateral`,
                    arguments: [tx.object(this.options.treasuryObjectId), auth],
                    typeArguments: [this.options.collaterals[collateralKey].type],
                });
            }
        }
    }

    // Get a list of benefactor disabler actions.
    benefactorDisablerActions(tx: Transaction) {
        return {
            // Disables a benefactor.
            disableBenefactor: (benefactorAddress: string) => {
                const auth = this.newAuthProof(tx, 'benefactorDisabler');
                tx.moveCall({
                    target: `${this.options.package.latest}::benefactor_disabler::disable_benefactor`,
                    arguments: [tx.object(this.options.treasuryObjectId), auth, tx.pure.address(benefactorAddress)],
                });
            }
        }
    }

    // Get a list of epoch period manager actions.
    epochPeriodManagerActions(tx: Transaction) {
        return {
            // Sets the epoch duration. Precision MUST be in milliseconds!
            setEpochDurationMs: (duration: number) => {
                const auth = this.newAuthProof(tx, 'epochPeriodManager');
                tx.moveCall({
                    target: `${this.options.package.latest}::epoch_period_manager::set_epoch_duration`,
                    arguments: [tx.object(this.options.treasuryObjectId), auth, tx.pure.u64(duration)],
                });
            },
            // Sets the period duration. Precision MUST be in milliseconds!
            setPeriodDurationMs: (duration: number) => {
                const auth = this.newAuthProof(tx, 'epochPeriodManager');
                tx.moveCall({
                    target: `${this.options.package.latest}::epoch_period_manager::set_period_duration`,
                    arguments: [tx.object(this.options.treasuryObjectId), auth, tx.pure.u64(duration)],
                });
            },
            // Sets the global epoch limits. Precision MUST be in 6 decimals!
            setGlobalEpochLimits: (limit: Limit) => {
                const auth = this.newAuthProof(tx, 'epochPeriodManager');
                const limitObj = this.newLimit(tx, limit);
                tx.moveCall({
                    target: `${this.options.package.latest}::epoch_period_manager::set_global_epoch_limits`,
                    arguments: [tx.object(this.options.treasuryObjectId), auth, limitObj],
                });
            },
            // Sets the global period limits. Precision MUST be in 6 decimals!
            setGlobalPeriodLimits: (limit: Limit) => {
                const auth = this.newAuthProof(tx, 'epochPeriodManager');
                const limitObj = this.newLimit(tx, limit);
                tx.moveCall({
                    target: `${this.options.package.latest}::epoch_period_manager::set_global_period_limits`,
                    arguments: [tx.object(this.options.treasuryObjectId), auth, limitObj],
                });
            },

            setDefaultBenefactorMaxMintPerEpoch: (maxMint: number) => {
                const auth = this.newAuthProof(tx, 'epochPeriodManager');
                tx.moveCall({
                    target: `${this.options.package.latest}::epoch_period_manager::set_default_benefactor_max_mint_per_epoch`,
                    arguments: [tx.object(this.options.treasuryObjectId), auth, tx.pure.u64(maxMint)],
                });
            },
            setDefaultBenefactorMaxRedeemPerEpoch: (maxRedeem: number) => {
                const auth = this.newAuthProof(tx, 'epochPeriodManager');
                tx.moveCall({
                    target: `${this.options.package.latest}::epoch_period_manager::set_default_benefactor_max_redeem_per_epoch`,
                    arguments: [tx.object(this.options.treasuryObjectId), auth, tx.pure.u64(maxRedeem)],
                });
            },
            setDefaultBenefactorMaxMintPerPeriod: (maxMint: number) => {
                const auth = this.newAuthProof(tx, 'epochPeriodManager');
                tx.moveCall({
                    target: `${this.options.package.latest}::epoch_period_manager::set_default_benefactor_max_mint_per_period`,
                    arguments: [tx.object(this.options.treasuryObjectId), auth, tx.pure.u64(maxMint)],
                });
            },
            setDefaultBenefactorMaxRedeemPerPeriod: (maxRedeem: number) => {
                const auth = this.newAuthProof(tx, 'epochPeriodManager');
                tx.moveCall({
                    target: `${this.options.package.latest}::epoch_period_manager::set_default_benefactor_max_redeem_per_period`,
                    arguments: [tx.object(this.options.treasuryObjectId), auth, tx.pure.u64(maxRedeem)],
                });
            }
        }
    }

    // Get a list of globalDisabler actions
    globalDisablerActions(tx: Transaction) {
        return {
            // Disables mint/redeem globally.
            disableMintRedeem: () => {
                const auth = this.newAuthProof(tx, 'globalDisabler');
                tx.moveCall({
                    target: `${this.options.package.latest}::global_disabler::disable_mint_redeem`,
                    arguments: [tx.object(this.options.treasuryObjectId), auth],
                });
            }
        }
    }

    benefactorManagerActions(tx: Transaction) {
        return {
            // Add a new benefactor. Use 0 for whichever limit you want to use the default for.
            addBenefactor: (benefactorAddress: string, limits: {
                epoch: Limit;
                period: Limit;
            }) => {
                const auth = this.newAuthProof(tx, 'benefactorManager');
                const limitsObj = this.newLimits(tx, limits);
                tx.moveCall({
                    target: `${this.options.package.latest}::benefactor_manager::add_benefactor`,
                    arguments: [tx.object(this.options.treasuryObjectId), auth, tx.pure.address(benefactorAddress), limitsObj],
                });
            },
            removeBenefactor: (benefactorAddress: string) => {
                const auth = this.newAuthProof(tx, 'benefactorManager');
                tx.moveCall({
                    target: `${this.options.package.latest}::benefactor_manager::remove_benefactor`,
                    arguments: [tx.object(this.options.treasuryObjectId), auth, tx.pure.address(benefactorAddress)],
                });
            },
            setBenefactorMaxMintPerEpoch: (benefactorAddress: string, maxMint: number) => {
                const auth = this.newAuthProof(tx, 'benefactorManager');
                tx.moveCall({
                    target: `${this.options.package.latest}::benefactor_manager::set_benefactor_max_mint_per_epoch`,
                    arguments: [tx.object(this.options.treasuryObjectId), auth, tx.pure.address(benefactorAddress), tx.pure.u64(maxMint)],
                });
            },
            setBenefactorMaxRedeemPerEpoch: (benefactorAddress: string, maxRedeem: number) => {
                const auth = this.newAuthProof(tx, 'benefactorManager');    
                tx.moveCall({
                    target: `${this.options.package.latest}::benefactor_manager::set_benefactor_max_redeem_per_epoch`,
                    arguments: [tx.object(this.options.treasuryObjectId), auth, tx.pure.address(benefactorAddress), tx.pure.u64(maxRedeem)],
                });
            },
            setBenefactorMaxMintPerPeriod: (benefactorAddress: string, maxMint: number) => {
                const auth = this.newAuthProof(tx, 'benefactorManager');
                tx.moveCall({
                    target: `${this.options.package.latest}::benefactor_manager::set_benefactor_max_mint_per_period`,
                    arguments: [tx.object(this.options.treasuryObjectId), auth, tx.pure.address(benefactorAddress), tx.pure.u64(maxMint)],
                });
            },
            setBenefactorMaxRedeemPerPeriod: (benefactorAddress: string, maxRedeem: number) => {
                const auth = this.newAuthProof(tx, 'benefactorManager');
                tx.moveCall({
                    target: `${this.options.package.latest}::benefactor_manager::set_benefactor_max_redeem_per_period`,
                    arguments: [tx.object(this.options.treasuryObjectId), auth, tx.pure.address(benefactorAddress), tx.pure.u64(maxRedeem)],
                });
            },
            // Sets the mint fee for a benefactor. Fee is in BPS (basis points).
            setBenefactorMintFee: (benefactorAddress: string, collateralKey: CollateralType, fee: number) => {
                const auth = this.newAuthProof(tx, 'benefactorManager');
                tx.moveCall({
                    target: `${this.options.package.latest}::benefactor_manager::set_benefactor_mint_fee`,
                    arguments: [tx.object(this.options.treasuryObjectId), auth, tx.pure.address(benefactorAddress), tx.pure.u16(fee)],
                    typeArguments: [this.options.collaterals[collateralKey].type],
                });
            },
            // Sets the redeem fee for a benefactor. Fee is in BPS (basis points).
            setBenefactorRedeemFee: (benefactorAddress: string, collateralKey: CollateralType, fee: number) => {
                const auth = this.newAuthProof(tx, 'benefactorManager');
                tx.moveCall({
                    target: `${this.options.package.latest}::benefactor_manager::set_benefactor_redeem_fee`,
                    arguments: [tx.object(this.options.treasuryObjectId), auth, tx.pure.address(benefactorAddress), tx.pure.u16(fee)],
                    typeArguments: [this.options.collaterals[collateralKey].type],
                });
            },
            // Sets mint fee exemption for a benefactor (0 fee).
            setBenefactorExemptMintFee: (benefactorAddress: string, collateralKey: CollateralType) => {
                const auth = this.newAuthProof(tx, 'benefactorManager');
                tx.moveCall({
                    target: `${this.options.package.latest}::benefactor_manager::set_benefactor_exempt_mint_fee`,
                    arguments: [tx.object(this.options.treasuryObjectId), auth, tx.pure.address(benefactorAddress)],
                    typeArguments: [this.options.collaterals[collateralKey].type],
                });
            },
            // Sets redeem fee exemption for a benefactor (0 fee).
            setBenefactorExemptRedeemFee: (benefactorAddress: string, collateralKey: CollateralType) => {
                const auth = this.newAuthProof(tx, 'benefactorManager');
                tx.moveCall({
                    target: `${this.options.package.latest}::benefactor_manager::set_benefactor_exempt_redeem_fee`,
                    arguments: [tx.object(this.options.treasuryObjectId), auth, tx.pure.address(benefactorAddress)],
                    typeArguments: [this.options.collaterals[collateralKey].type],
                });
            }
        }
    }

    permissionlessActions(tx: Transaction) {
        return {
            shareOracle: (oracleId: TransactionResult) => {
                tx.moveCall({
                    target: `${this.options.package.latest}::aggregated_oracle::share`,
                    arguments: [oracleId],
                });
            },
            shareTreasury: (treasuryId: TransactionResult) => {
                tx.moveCall({
                    target: `${this.options.package.latest}::treasury::share`,
                    arguments: [treasuryId],
                });
            },
            replenish: (collateralKey: CollateralType, coin: TransactionObjectArgument | string) => {
                tx.moveCall({
                    target: `${this.options.package.latest}::permissionless::replenish`,
                    arguments: [tx.object(this.options.treasuryObjectId), tx.object(coin)],
                    typeArguments: [this.options.collaterals[collateralKey].type],
                });
            },

            replenishReceiving: (collateralKey: CollateralType, receiving: string) => {
                tx.moveCall({
                    target: `${this.options.package.latest}::permissionless::replenish_receiving`,
                    arguments: [tx.object(this.options.treasuryObjectId), tx.object(receiving)],
                    typeArguments: [this.options.collaterals[collateralKey].type],
                });
            },
        }
    }

    collateralManagerActions(tx: Transaction) {
        return {
            // Add a new collateral.
            addCollateral: (options: {
                collateralKey: CollateralType;
                limits: {
                    epoch: Limit;
                    period: Limit;
                };
                custodianAddress: string; // address
                minOraclePrice: number; // 6 decimals
                maxOraclePrice: number; // 6 decimals
                maxOracleAgeMs: number; // in milliseconds
                oracle: string | TransactionObjectArgument;
                defaultFee: {
                    mint: number; // bps
                    redeem: number; // bps
                };
            }) => {
                const auth = this.newAuthProof(tx, 'collateralManager');
                const limitsObj = this.newLimits(tx, options.limits);

                const collateralType = this.options.collaterals[options.collateralKey].type;

                const collateralConfig = tx.moveCall({
                    target: `${this.options.package.latest}::collateral_config::new`,
                    arguments: [
                        tx.object(deriveCurrencyId(collateralType)), // currency<T>
                        limitsObj, // limits
                        tx.pure.address(options.custodianAddress), // custodian address
                        tx.pure.u64(options.minOraclePrice), // min oracle price
                        tx.pure.u64(options.maxOraclePrice), // max oracle price
                        tx.pure.u64(options.maxOracleAgeMs), // max oracle age
                        tx.object(options.oracle), // oracle
                        this.newCollateralFee(tx, options.defaultFee), // default fee
                    ],
                    typeArguments: [collateralType],
                });

                tx.moveCall({
                    target: `${this.options.package.latest}::collateral_manager::add_collateral`,
                    arguments: [tx.object(this.options.treasuryObjectId), auth, collateralConfig],
                    typeArguments: [collateralType],
                });
            },
            // Remove a collateral.
            removeCollateral: (collateralKey: CollateralType) => {
                const auth = this.newAuthProof(tx, 'collateralManager');
                tx.moveCall({
                    target: `${this.options.package.latest}::collateral_manager::remove_collateral`,
                    arguments: [tx.object(this.options.treasuryObjectId), auth],
                    typeArguments: [this.options.collaterals[collateralKey].type],
                });
            },

            setCollateralLimits: (collateralKey: CollateralType, limits: {
                epoch: Limit;
                period: Limit;
            }) => {
                const auth = this.newAuthProof(tx, 'collateralManager');
                const limitsObj = this.newLimits(tx, limits);
                tx.moveCall({
                    target: `${this.options.package.latest}::collateral_manager::set_collateral_limits`,
                    arguments: [tx.object(this.options.treasuryObjectId), auth, limitsObj],
                    typeArguments: [this.options.collaterals[collateralKey].type],
                });
            },

            setCollateralDefaultFees: (collateralKey: CollateralType, fees: {
                mint: number; // bps
                redeem: number; // bps
            }) => {
                const auth = this.newAuthProof(tx, 'collateralManager');
                const feesObj = this.newCollateralFee(tx, fees);
                tx.moveCall({
                    target: `${this.options.package.latest}::collateral_manager::set_collateral_default_fees`,
                    arguments: [tx.object(this.options.treasuryObjectId), auth, feesObj],
                    typeArguments: [this.options.collaterals[collateralKey].type],
                });
            },

            /// amount MUST be in the decimals of the collateral!
            transferToCustody: (collateralKey: CollateralType, amount: number) => {
                const auth = this.newAuthProof(tx, 'collateralManager');
                tx.moveCall({
                    target: `${this.options.package.latest}::collateral_manager::transfer_to_custody`,
                    arguments: [tx.object(this.options.treasuryObjectId), auth, tx.pure.u64(amount)],
                    typeArguments: [this.options.collaterals[collateralKey].type],
                });
            },

            setCollateralOracleId: (collateralKey: CollateralType, oracleId: string |TransactionResult) => {
                const auth = this.newAuthProof(tx, 'collateralManager');
                tx.moveCall({
                    target: `${this.options.package.latest}::collateral_manager::set_collateral_oracle_id`,
                    arguments: [tx.object(this.options.treasuryObjectId), auth, typeof oracleId === 'string' ? tx.pure.id(oracleId) : oracleId],
                    typeArguments: [this.options.collaterals[collateralKey].type],
                });
            },

            setCollateralMinPrice: (collateralKey: CollateralType, minPrice: number) => {
                const auth = this.newAuthProof(tx, 'collateralManager');
                tx.moveCall({
                    target: `${this.options.package.latest}::collateral_manager::set_collateral_min_price`,
                    arguments: [tx.object(this.options.treasuryObjectId), auth, tx.pure.u64(minPrice)],
                    typeArguments: [this.options.collaterals[collateralKey].type],
                });
            },
            
            setCollateralMaxPrice: (collateralKey: CollateralType, maxPrice: number) => {
                const auth = this.newAuthProof(tx, 'collateralManager');
                tx.moveCall({
                    target: `${this.options.package.latest}::collateral_manager::set_collateral_max_price`,
                    arguments: [tx.object(this.options.treasuryObjectId), auth, tx.pure.u64(maxPrice)],
                    typeArguments: [this.options.collaterals[collateralKey].type],
                });
            },

            setCollateralMaxAgeMs: (collateralKey: CollateralType, maxAgeMs: number) => {
                const auth = this.newAuthProof(tx, 'collateralManager');
                tx.moveCall({
                    target: `${this.options.package.latest}::collateral_manager::set_collateral_max_age_ms`,
                    arguments: [tx.object(this.options.treasuryObjectId), auth, tx.pure.u64(maxAgeMs)],
                    typeArguments: [this.options.collaterals[collateralKey].type],
                });
            },

            setCollateralCustodianAddress: (collateralKey: CollateralType, custodianAddress: string) => {
                const auth = this.newAuthProof(tx, 'collateralManager');
                tx.moveCall({
                    target: `${this.options.package.latest}::collateral_manager::set_custodian_address`,
                    arguments: [tx.object(this.options.treasuryObjectId), auth, tx.pure.address(custodianAddress)],
                    typeArguments: [this.options.collaterals[collateralKey].type],
                });
            },
        }
    }

    benefactorActions(tx: Transaction) {
        return {
            /// Minting returns the `Coin<SUI_USDE` as an argument.
            /// This can then be transferred to self, or used in any other ptb command.
            mint: (options: OrderOptions) => {
                const collateralType = this.options.collaterals[options.collateralKey].type;
                const order = this.newOrder(tx, true, collateralType, options);
                const auth = this.newAuthProof(tx, 'benefactor');

                return tx.moveCall({
                    target: `${this.options.package.latest}::benefactor::mint`,
                    arguments: [tx.object(this.options.treasuryObjectId), auth, order, tx.object.clock(), options.oracleProof],
                    typeArguments: [collateralType],
                })
            },
            /// Redeeming returns the `Coin<C>` as an argument.
            /// This can then be transferred to self, or used in any other ptb command.
            redeem: (options: OrderOptions) => {
                const collateralType = this.options.collaterals[options.collateralKey].type;
                const order = this.newOrder(tx, false, this.getBaseCoinType(), options);
                const auth = this.newAuthProof(tx, 'benefactor');

                return tx.moveCall({
                    target: `${this.options.package.latest}::benefactor::redeem`,
                    arguments: [tx.object(this.options.treasuryObjectId), auth, order, tx.object.clock(), options.oracleProof],
                    typeArguments: [collateralType],    
                })
            }

        }
    }

    denylistManagerActions(tx: Transaction) {
        return {
            addToDenylist: (addr: string) => {
                const auth = this.newAuthProof(tx, 'denylistManager');
                tx.moveCall({
                    target: `${this.options.package.latest}::denylist_manager::add_to_denylist`,
                    arguments: [tx.object(this.options.treasuryObjectId), auth, tx.object.denyList(), tx.pure.address(addr)],
                });
            },
            removeFromDenylist: (addr: string) => {
                const auth = this.newAuthProof(tx, 'denylistManager');
                tx.moveCall({
                    target: `${this.options.package.latest}::denylist_manager::remove_from_denylist`,
                    arguments: [tx.object(this.options.treasuryObjectId), auth, tx.object.denyList(), tx.pure.address(addr)],
                });
            }
        }
    }

    /// helps us overwrite the treasury object for the initialiazation tx. This only makes sense
    /// if the treasury Object did not exist when initializing the client.
    setTreasuryObjectForInitialization(treasuryObjectId: TransactionObjectArgument | string) {
        if (!!this.options.treasuryObjectId) throw new Error('Treasury object already set');
        this.options.treasuryObjectId = treasuryObjectId;
    }

    getOptions() { return this.options; }

    /// Init an oracle commitment flow.
    newOracleProof(tx: Transaction, collateralKey: CollateralType) {
        const collateral = this.options.collaterals[collateralKey];
        return tx.moveCall({
            target: `${this.options.package.latest}::permissionless::new_oracle_proof`,
            arguments: [tx.object(this.options.treasuryObjectId), tx.object(collateral.aggregatedOracleId)],
        });
    }
    
    /// Commit the pyth price
    commitPythPrice(tx: Transaction, collateralKey: CollateralType, infoObject: TransactionObjectArgument, oracleProof: TransactionObjectArgument) {
        const collateral = this.options.collaterals[collateralKey];
        return tx.moveCall({
            target: `${this.options.package.latest}::permissionless::commit_pyth_price`,
            arguments: [tx.object(this.options.treasuryObjectId), tx.object(collateral.aggregatedOracleId), infoObject, oracleProof, tx.object.clock()],
        });
    }

    /// When creating a new order, you supply a coin (objectID or value).
    /// If you are redeeming, you need to supply `SUIUSDE` token, if you are minting, you need to supply
    /// an accepted collateral type.
    private newOrder(tx: Transaction, isMint: boolean, coinType: string, options: OrderOptions) {

        return tx.moveCall({
            target: `${this.options.package.latest}::order::new`,
            arguments: [tx.object(options.coin), tx.pure.u64(options.expiryMs), tx.pure.u64(options.minAmountOut), tx.pure.string(options.nonce), tx.object.clock()],
            typeArguments: [coinType],
        });
    }
}

/// Derive the object ID for the currency.
const deriveCurrencyId = (collateralType: string) => {
    const key = bcs.struct('CurrencyKey', { dummy_value: bcs.bool() }).serialize({ dummy_value: false }).toBytes();
    return deriveObjectID('0xc', `0x2::coin_registry::CurrencyKey<${collateralType}>`, key);
}


/// This is a one-off initialization transaction we'll run once we publish the smart contract.
/// This gives us the opportunity to:
/// 1. Set the initial limits
/// 2. Set the initial fees
/// 3. Add the initial roles in the system
/// 4. Add the first collateral (USDC)
export const initialize = async (tx: Transaction, client: SuiUSDE, settings: {
    publisherBurnerAddress: string;
    roles: {
        admins: string[];
        collateralManagers: string[];
        epochPeriodManagers: string[];
        globalDisablers: string[];
        pegManagers: string[];
        collateralDisablers: string[];
        benefactorManagers: string[];
        benefactorDisablers: string[];
        denylistManagers: string[];
        oracleManagers: string[];
    }
    treasuryCapObjectId: string;
    denyCapObjectId: string;
    metadataCapObjectId: string;
    epochDurationMs: number;
    periodDurationMs: number;
    globalLimits: {
        epoch: Limit;
        period: Limit;
    };
    defaultBenefactorLimits: {
        epoch: Limit;
        period: Limit;
    };
    pegPrice: number; // 6 decimals precision
}) => {

    // Receive the `Currency<T>` to promote and make metadata visible.
    const currencyToBePromoted = await client.getClient().getOwnedObjects({
        owner: normalizeSuiAddress('0xc'),
        filter: {
            StructType: `0x2::coin_registry::Currency<${client.getBaseCoinType()}>`
        }
    });

    // Promote currency
    if (currencyToBePromoted.data?.length > 0) {
        let currencyObj = currencyToBePromoted.data[0]!.data!;
        tx.moveCall({
            target: `0x2::coin_registry::finalize_registration`,
            arguments: [tx.object('0xc'), tx.receivingRef(currencyObj)],
            typeArguments: [client.getBaseCoinType()]
        });
    }

    const config = tx.moveCall({
        target: `${client.getOptions().package.v1}::config::new`,
        arguments: [
            tx.pure.u64(settings.epochDurationMs),
            tx.pure.u64(settings.periodDurationMs),
            client.newLimits(tx, settings.globalLimits),
            client.newLimits(tx, settings.defaultBenefactorLimits),
            tx.pure.u64(settings.pegPrice),
        ],
    });

    const treasury = tx.moveCall({
        target: `${client.getOptions().package.latest}::treasury::create`,
        arguments: [
            tx.object(settings.treasuryCapObjectId),
            tx.object(settings.denyCapObjectId),
            tx.object(settings.metadataCapObjectId),
            config,
        ],
    });

    // Set the treasuryObject to be the newly created object.
    client.setTreasuryObjectForInitialization(treasury);

    // Authorize all the supplied addresses
    for (const admin of settings.roles.admins) client.adminActions(tx).authorizeRole(admin, 'admin');
    for (const collateralManager of settings.roles.collateralManagers) client.adminActions(tx).authorizeRole(collateralManager, 'collateralManager');
    for (const epochPeriodManager of settings.roles.epochPeriodManagers) client.adminActions(tx).authorizeRole(epochPeriodManager, 'epochPeriodManager');
    for (const globalDisabler of settings.roles.globalDisablers) client.adminActions(tx).authorizeRole(globalDisabler, 'globalDisabler');
    for (const pegManager of settings.roles.pegManagers) client.adminActions(tx).authorizeRole(pegManager, 'pegManager');
    for (const collateralDisabler of settings.roles.collateralDisablers) client.adminActions(tx).authorizeRole(collateralDisabler, 'collateralDisabler');
    for (const benefactorManager of settings.roles.benefactorManagers) client.adminActions(tx).authorizeRole(benefactorManager, 'benefactorManager');
    for (const benefactorDisabler of settings.roles.benefactorDisablers) client.adminActions(tx).authorizeRole(benefactorDisabler, 'benefactorDisabler');
    for (const denylistManager of settings.roles.denylistManagers) client.adminActions(tx).authorizeRole(denylistManager, 'denylistManager');

    client.adminActions(tx).authorizeRole(settings.publisherBurnerAddress, 'oracleManager');

    let oracle = client.oracleManagerActions(tx).newOracle({
        minimumSources: 1,
        maxAgeMs: 60 * 1_000, // 1 minute in ms
        minPrice: 980_000, // 0.98$ in 6 decimals precision
        maxPrice: 1_020_000, // 1.02$ in 6 decimals precision
    });

    // Set pyth's feed id for USDC/usd oracle.
    client.oracleManagerActions(tx).addOracleFeed(oracle, 'pyth', fromHex(client.options.collaterals.usdc.pyth.feed));

    // Authorize the current admin as collateral Manager for the purpose of adding the collaterals
    client.adminActions(tx).authorizeRole(settings.publisherBurnerAddress, 'collateralManager');

    const options = client.getOptions();

    // Add the first collateral (USDC)
    if (options.collaterals.usdc.enable) {
        client.collateralManagerActions(tx).addCollateral({
            collateralKey: 'usdc', // add USDC collateral
            limits: settings.globalLimits, // Re-use global limits for the collateral
            custodianAddress: options.collaterals.usdc.custodianAddress, // The address of the custodian for the collateral.
            minOraclePrice: 980_000, // 0.98$ in 6 decimals precision
            maxOraclePrice: 1_020_000, // 1.02$ in 6 decimals precision
            maxOracleAgeMs: 60 * 1_000, // 1 minute in ms
            oracle, // use the oracle that was created above!
            defaultFee: {
                mint: 5, // 5bps
                redeem: 5, // 5bps
            },
        });
    
        // Enable the USDC collateral after enabling the oracle.
        client.adminActions(tx).enableCollateral('usdc');
    }

    if (options.collaterals.dummyUsdc.enable) {
        client.collateralManagerActions(tx).addCollateral({
            collateralKey: 'dummyUsdc', // add DUMMY_USDC collateral
            limits: settings.globalLimits, // Re-use global limits for the collateral
            custodianAddress: options.collaterals.dummyUsdc.custodianAddress, // The address of the custodian for the collateral.
            minOraclePrice: 980_000, // 0.98$ in 6 decimals precision
            maxOraclePrice: 1_020_000, // 1.02$ in 6 decimals precision
            // maxOracleAgeMs: 30 * 1_000, // 30 seconds in ms
            maxOracleAgeMs: 24 * 60 * 60 * 1_000, // 24 hours in ms (FOR TESTING ONLY)
            oracle, // use the oracle that was created above!
            defaultFee: {
                mint: 5, // 5bps
                redeem: 5, // 5bps
            },
        });

        // Enable the DUMMY_USDC collateral after enabling the oracle.
        client.adminActions(tx).enableCollateral('dummyUsdc');
    }

    // Enable a benefacotr for the test KYB'd address
    client.adminActions(tx).authorizeRole(settings.publisherBurnerAddress, 'benefactorManager');
    // Add the KYB'd address
    client.benefactorManagerActions(tx).addBenefactor('0x146e9f538b1f99bb9dad3d4b4d4401a570c94bc7618903c63501007100b08438', {
        epoch: { mint: 0, redeem: 0},
        period: { mint: 0, redeem: 0}
    });

    // Enable mint/redeem as an admin.
    client.adminActions(tx).enableMintRedeem();

    // Deauthorize the publisher burner address from the collateral manager role.
    client.adminActions(tx).deauthorizeRole(settings.publisherBurnerAddress, 'collateralManager');
    client.adminActions(tx).deauthorizeRole(settings.publisherBurnerAddress, 'oracleManager');
    client.adminActions(tx).deauthorizeRole(settings.publisherBurnerAddress, 'benefactorManager');

    client.permissionlessActions(tx).shareOracle(oracle);
    client.permissionlessActions(tx).shareTreasury(treasury);

    // TODO: uncomment on prod(?)
    // client.adminActions(tx).deauthorizeRole(settings.publisherBurnerAddress, 'admin');
}
