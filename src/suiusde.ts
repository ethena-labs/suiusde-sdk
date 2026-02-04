import type { SuiClient } from "@mysten/sui/client";
import {
  Transaction,
  type TransactionObjectArgument,
  type TransactionResult,
} from "@mysten/sui/transactions";
import { deriveDynamicFieldID } from "@mysten/sui/utils";
import type { CollateralType, SuiUSDEOptions } from "./utils/constants.js";
import { CollateralKey, Treasury } from "./generated/suiusde/treasury.js";

/// Options for creating a new order (mint or redeem).
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
  oracleProof: TransactionResult;
};

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
  };
};

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
    if (!this.options.treasuryObjectId)
      throw new Error(
        "Treasury object ID is not set. Please initialize it first!",
      );
    const treasury = await this.client.getObject({
      id: this.options.treasuryObjectId as string,
      options: { showBcs: true },
    });
    if (treasury.data?.bcs?.dataType !== "moveObject")
      throw new Error("Expected a move object");

    const treasuryData = Treasury.fromBase64(treasury.data.bcs.bcsBytes);

    return {
      config: treasuryData.config,
      collateralsBagId: treasuryData.collaterals.id.id,
      rolesBagId: treasuryData.roles.data.id.id,
      benefactorsBagId: treasuryData.benefactors.id.id,
      totalAdmins: treasuryData.roles.admin_count,
    };
  }

  /**
   * Returns an individual collateral's object data.
   * Can be used for querying current limits, available replenishment data etc.
   * */
  async queryCollateral(collateralKey: CollateralType) {
    const treasuryData = await this.getTreasury();

    const type = `${this.options.package.v1}::treasury::CollateralKey<${this.options.collaterals[collateralKey].type}>`;

    const collateralObjectId = deriveDynamicFieldID(
      treasuryData.collateralsBagId,
      type,
      CollateralKey.serialize([false]).toBytes(),
    );

    const result = await this.client.getObject({
      id: collateralObjectId,
      options: { showContent: true },
    });

    if (result.data?.content?.dataType !== "moveObject")
      throw new Error("Expected a move object");

    const content = (result.data.content.fields as any).value.fields;

    let limiter = {
      epochCounter: content.limiter.fields.epoch_counter.fields,
      periodCounter: content.limiter.fields.period_counter.fields,
      limits: {
        epoch: content.limiter.fields.limits.fields.epoch.fields,
        period: content.limiter.fields.limits.fields.period.fields,
      },
    };

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
      replenish: (
        collateralKey: CollateralType,
        coin: TransactionObjectArgument | string,
      ) => {
        tx.moveCall({
          target: `${this.options.package.latest}::permissionless::replenish`,
          arguments: [
            tx.object(this.options.treasuryObjectId),
            tx.object(coin),
          ],
          typeArguments: [this.options.collaterals[collateralKey].type],
        });
      },

      replenishReceiving: (
        collateralKey: CollateralType,
        receiving: string,
      ) => {
        tx.moveCall({
          target: `${this.options.package.latest}::permissionless::replenish_receiving`,
          arguments: [
            tx.object(this.options.treasuryObjectId),
            tx.object(receiving),
          ],
          typeArguments: [this.options.collaterals[collateralKey].type],
        });
      },
    };
  }

  benefactorActions(tx: Transaction) {
    return {
      /// Minting returns the `Coin<SUI_USDE` as an argument.
      /// This can then be transferred to self, or used in any other ptb command.
      mint: (options: OrderOptions) => {
        const collateralType =
          this.options.collaterals[options.collateralKey].type;
        const order = this.newOrder(tx, true, collateralType, options);
        const auth = this.newAuthProof(tx, "benefactor");

        return tx.moveCall({
          target: `${this.options.package.latest}::benefactor::mint`,
          arguments: [
            tx.object(this.options.treasuryObjectId),
            auth,
            order,
            tx.object.clock(),
            options.oracleProof,
          ],
          typeArguments: [collateralType],
        });
      },
      /// Redeeming returns the `Coin<C>` as an argument.
      /// This can then be transferred to self, or used in any other ptb command.
      redeem: (options: OrderOptions) => {
        const collateralType =
          this.options.collaterals[options.collateralKey].type;
        const order = this.newOrder(tx, false, this.getBaseCoinType(), options);
        const auth = this.newAuthProof(tx, "benefactor");

        return tx.moveCall({
          target: `${this.options.package.latest}::benefactor::redeem`,
          arguments: [
            tx.object(this.options.treasuryObjectId),
            auth,
            order,
            tx.object.clock(),
            options.oracleProof,
          ],
          typeArguments: [collateralType],
        });
      },
    };
  }

  /// Init an oracle commitment flow.
  newOracleProof(tx: Transaction, collateralKey: CollateralType) {
    const collateral = this.options.collaterals[collateralKey];
    return tx.moveCall({
      target: `${this.options.package.latest}::permissionless::new_oracle_proof`,
      arguments: [
        tx.object(this.options.treasuryObjectId),
        tx.object(collateral.aggregatedOracleId),
      ],
    });
  }

  /// Commit the pyth price
  commitPythPrice(
    tx: Transaction,
    collateralKey: CollateralType,
    infoObject: TransactionObjectArgument,
    oracleProof: TransactionObjectArgument,
  ) {
    const collateral = this.options.collaterals[collateralKey];
    return tx.moveCall({
      target: `${this.options.package.latest}::permissionless::commit_pyth_price`,
      arguments: [
        tx.object(this.options.treasuryObjectId),
        tx.object(collateral.aggregatedOracleId),
        infoObject,
        oracleProof,
        tx.object.clock(),
      ],
    });
  }

  /// When creating a new order, you supply a coin (objectID or value).
  /// If you are redeeming, you need to supply `SUIUSDE` token, if you are minting, you need to supply
  /// an accepted collateral type.
  private newOrder(
    tx: Transaction,
    isMint: boolean,
    coinType: string,
    options: OrderOptions,
  ) {
    return tx.moveCall({
      target: `${this.options.package.latest}::order::new`,
      arguments: [
        tx.object(options.coin),
        tx.pure.u64(options.expiryMs),
        tx.pure.u64(options.minAmountOut),
        tx.pure.string(options.nonce),
        tx.object.clock(),
      ],
      typeArguments: [coinType],
    });
  }
}
