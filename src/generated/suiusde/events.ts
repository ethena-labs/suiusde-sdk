/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { MoveTuple, MoveStruct } from "../utils/index.js";
import { bcs } from "@mysten/sui/bcs";
import * as limits from "./limits.js";
import * as collateral_fee from "./collateral_fee.js";
import * as limit from "./limit.js";
const $moduleName = "@suiusde/suiusde::events";
export const RoleAuthorized = new MoveTuple({
  name: `${$moduleName}::RoleAuthorized`,
  fields: [bcs.Address],
});
export const RoleDeauthorized = new MoveTuple({
  name: `${$moduleName}::RoleDeauthorized`,
  fields: [bcs.Address],
});
export const MintRedeemEnabled = new MoveTuple({
  name: `${$moduleName}::MintRedeemEnabled`,
  fields: [bcs.bool()],
});
export const MintRedeemDisabled = new MoveTuple({
  name: `${$moduleName}::MintRedeemDisabled`,
  fields: [bcs.bool()],
});
export const CollateralEnabled = new MoveTuple({
  name: `${$moduleName}::CollateralEnabled`,
  fields: [bcs.bool()],
});
export const CollateralAdded = new MoveTuple({
  name: `${$moduleName}::CollateralAdded`,
  fields: [bcs.bool()],
});
export const CollateralDisabled = new MoveTuple({
  name: `${$moduleName}::CollateralDisabled`,
  fields: [bcs.bool()],
});
export const CollateralLimitsUpdated = new MoveTuple({
  name: `${$moduleName}::CollateralLimitsUpdated`,
  fields: [limits.Limits],
});
export const CollateralRemoved = new MoveTuple({
  name: `${$moduleName}::CollateralRemoved`,
  fields: [bcs.bool()],
});
export const CollateralFeesUpdated = new MoveTuple({
  name: `${$moduleName}::CollateralFeesUpdated`,
  fields: [collateral_fee.CollateralFee],
});
export const CollateralCustodyTransfer = new MoveStruct({
  name: `${$moduleName}::CollateralCustodyTransfer`,
  fields: {
    amount: bcs.u64(),
    custodian: bcs.Address,
  },
});
export const CollateralCustodianAddressUpdated = new MoveTuple({
  name: `${$moduleName}::CollateralCustodianAddressUpdated`,
  fields: [bcs.Address],
});
export const CollateralOracleMinPriceUpdated = new MoveTuple({
  name: `${$moduleName}::CollateralOracleMinPriceUpdated`,
  fields: [bcs.u64()],
});
export const CollateralOracleMaxPriceUpdated = new MoveTuple({
  name: `${$moduleName}::CollateralOracleMaxPriceUpdated`,
  fields: [bcs.u64()],
});
export const CollateralOracleMaxAgeUpdated = new MoveTuple({
  name: `${$moduleName}::CollateralOracleMaxAgeUpdated`,
  fields: [bcs.u64()],
});
export const CollateralOracleIdUpdated = new MoveTuple({
  name: `${$moduleName}::CollateralOracleIdUpdated`,
  fields: [bcs.Address],
});
export const OracleFeedAdded = new MoveTuple({
  name: `${$moduleName}::OracleFeedAdded`,
  fields: [bcs.Address, bcs.string(), bcs.vector(bcs.u8())],
});
export const OracleFeedRemoved = new MoveTuple({
  name: `${$moduleName}::OracleFeedRemoved`,
  fields: [bcs.Address, bcs.string()],
});
export const OraclePythConfidenceBpsUpdated = new MoveTuple({
  name: `${$moduleName}::OraclePythConfidenceBpsUpdated`,
  fields: [bcs.Address, bcs.u16()],
});
export const OracleMinimumSourcesUpdated = new MoveTuple({
  name: `${$moduleName}::OracleMinimumSourcesUpdated`,
  fields: [bcs.Address, bcs.u8()],
});
export const OracleMinPriceUpdated = new MoveTuple({
  name: `${$moduleName}::OracleMinPriceUpdated`,
  fields: [bcs.Address, bcs.u64()],
});
export const OracleMaxPriceUpdated = new MoveTuple({
  name: `${$moduleName}::OracleMaxPriceUpdated`,
  fields: [bcs.Address, bcs.u64()],
});
export const OracleMaxAgeUpdated = new MoveTuple({
  name: `${$moduleName}::OracleMaxAgeUpdated`,
  fields: [bcs.Address, bcs.u64()],
});
export const OraclePriceTooSmall = new MoveStruct({
  name: `${$moduleName}::OraclePriceTooSmall`,
  fields: {
    oracle_id: bcs.Address,
    identifier: bcs.string(),
    price: bcs.u64(),
  },
});
export const OraclePriceTooLarge = new MoveStruct({
  name: `${$moduleName}::OraclePriceTooLarge`,
  fields: {
    oracle_id: bcs.Address,
    identifier: bcs.string(),
    price: bcs.u64(),
  },
});
export const OraclePriceStale = new MoveStruct({
  name: `${$moduleName}::OraclePriceStale`,
  fields: {
    oracle_id: bcs.Address,
    identifier: bcs.string(),
  },
});
export const PythConfidenceNotValid = new MoveStruct({
  name: `${$moduleName}::PythConfidenceNotValid`,
  fields: {
    oracle_id: bcs.Address,
  },
});
export const EpochLimitsUpdated = new MoveTuple({
  name: `${$moduleName}::EpochLimitsUpdated`,
  fields: [limit.Limit],
});
export const PeriodLimitsUpdated = new MoveTuple({
  name: `${$moduleName}::PeriodLimitsUpdated`,
  fields: [limit.Limit],
});
export const DefaultBenefactorEpochLimitsUpdated = new MoveTuple({
  name: `${$moduleName}::DefaultBenefactorEpochLimitsUpdated`,
  fields: [limit.Limit],
});
export const DefaultBenefactorPeriodLimitsUpdated = new MoveTuple({
  name: `${$moduleName}::DefaultBenefactorPeriodLimitsUpdated`,
  fields: [limit.Limit],
});
export const EpochDurationUpdated = new MoveStruct({
  name: `${$moduleName}::EpochDurationUpdated`,
  fields: {
    old_duration_ms: bcs.u64(),
    new_duration_ms: bcs.u64(),
  },
});
export const PeriodDurationUpdated = new MoveStruct({
  name: `${$moduleName}::PeriodDurationUpdated`,
  fields: {
    old_duration_ms: bcs.u64(),
    new_duration_ms: bcs.u64(),
  },
});
export const PegPriceUpdated = new MoveTuple({
  name: `${$moduleName}::PegPriceUpdated`,
  fields: [bcs.u64()],
});
export const BenefactorEnabled = new MoveTuple({
  name: `${$moduleName}::BenefactorEnabled`,
  fields: [bcs.Address],
});
export const BenefactorDisabled = new MoveTuple({
  name: `${$moduleName}::BenefactorDisabled`,
  fields: [bcs.Address],
});
export const BenefactorConfigUpdated = new MoveTuple({
  name: `${$moduleName}::BenefactorConfigUpdated`,
  fields: [bcs.Address],
});
export const BenefactorAdded = new MoveTuple({
  name: `${$moduleName}::BenefactorAdded`,
  fields: [bcs.Address],
});
export const BenefactorRemoved = new MoveTuple({
  name: `${$moduleName}::BenefactorRemoved`,
  fields: [bcs.Address],
});
export const AddressAddedToDenylist = new MoveTuple({
  name: `${$moduleName}::AddressAddedToDenylist`,
  fields: [bcs.Address],
});
export const AddressRemovedFromDenylist = new MoveTuple({
  name: `${$moduleName}::AddressRemovedFromDenylist`,
  fields: [bcs.Address],
});
export const OrderExecuted = new MoveStruct({
  name: `${$moduleName}::OrderExecuted`,
  fields: {
    is_mint: bcs.bool(),
    benefactor: bcs.Address,
    amount_in: bcs.u64(),
    amount_out: bcs.u64(),
    fee_bps: bcs.u16(),
    fee_is_charged: bcs.bool(),
    nonce: bcs.string(),
    expiry_ms: bcs.u64(),
    min_amount_out: bcs.u64(),
  },
});
export const OraclePriceCommitted = new MoveStruct({
  name: `${$moduleName}::OraclePriceCommitted`,
  fields: {
    oracle_id: bcs.Address,
    identifier: bcs.string(),
    price: bcs.u64(),
    timestamp_ms: bcs.u64(),
  },
});
export const AggregatedOraclePrice = new MoveStruct({
  name: `${$moduleName}::AggregatedOraclePrice`,
  fields: {
    oracle_id: bcs.Address,
    price: bcs.u64(),
    earliest_timestamp_ms: bcs.u64(),
  },
});
