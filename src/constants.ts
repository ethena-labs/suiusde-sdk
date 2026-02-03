import type { TransactionObjectArgument } from "@mysten/sui/transactions";

export type SuiUSDEOptions = {
    env: 'mainnet' | 'testnet';
    package:  {
        v1: string;
        latest: string;
    };
    treasuryObjectId: string | TransactionObjectArgument;
    collaterals: {
        usdc: {
            enable: boolean;
            aggregatedOracleId: string;
            type: string;
            pyth: {
                feed: string;
                identifier: string;
                priceInfoObjectId: string;
            };
            custodianAddress: string;
        },
        dummyUsdc: {
            enable: boolean;
            aggregatedOracleId: string;
            type: string;
            pyth: {
                feed: string;
                identifier: string;
                priceInfoObjectId: string;
            };
            custodianAddress: string;
        }
    },
    publishData: {
        treasuryCapObjectId: string;
        denyCapObjectId: string;
        metadataCapObjectId: string;
    }
}

export type CollateralType = keyof typeof TESTNET_CONSTANTS.collaterals;

export const TESTNET_CONSTANTS: SuiUSDEOptions = {
    env: 'testnet',
    package: {
        v1: '',
        latest: '',
    },
    treasuryObjectId: '',
    collaterals: {
        dummyUsdc: {
            enable: true,
            aggregatedOracleId: '0x6ffc8f6f3e7c304a83de498fddde91761c9fb82ebf5bf98c045af98235916e5a',
            custodianAddress: '0xcf442edd34986d7926e92f14a21e03be84982ed73b79ed5310496bb1395be9d3',
            type: '0x73c84c3700118019add9b5cdb8984dfc8dacc91f97b924de7ebe5a0bc7746b2f::dummy_usdc::DUMMY_USDC',
            pyth: {
                feed: '0x41f3625971ca2ed2263e78573fe5ce23e13d2558ed3f2e47ab0f84fb9e7ae722',
                identifier: 'pyth',
                priceInfoObjectId: '0x9c4dd4008297ffa5e480684b8100ec21cc934405ed9a25d4e4d7b6259aad9c81'
            },
        },
        usdc: {
            enable: true,
            aggregatedOracleId: '0x6ffc8f6f3e7c304a83de498fddde91761c9fb82ebf5bf98c045af98235916e5a',
            custodianAddress: '0xcf442edd34986d7926e92f14a21e03be84982ed73b79ed5310496bb1395be9d3',
            type: '0xa1ec7fc00a6f40db9693ad1415d0c193ad3906494428cf252621037bd7117e29::usdc::USDC',
            pyth: {
                feed: '0x41f3625971ca2ed2263e78573fe5ce23e13d2558ed3f2e47ab0f84fb9e7ae722',
                identifier: 'pyth',
                priceInfoObjectId: '0x9c4dd4008297ffa5e480684b8100ec21cc934405ed9a25d4e4d7b6259aad9c81'
            },
        }
    },
    publishData: {
        treasuryCapObjectId: '',
        denyCapObjectId: '',
        metadataCapObjectId: '',
    }
}

export const MAINNET_CONSTANTS: SuiUSDEOptions = {
    env: 'mainnet',
    package: {
        v1: '0x41d587e5336f1c86cad50d38a7136db99333bb9bda91cea4ba69115defeb1402',
        latest: '0x41d587e5336f1c86cad50d38a7136db99333bb9bda91cea4ba69115defeb1402'
    },
    treasuryObjectId: '0xe6c3c84c34ba2f4869b5df23161ea8700c14e1de1328808258702567e40366ea',
    collaterals: {
        usdc: {
            enable: true,
            aggregatedOracleId: '0x41247501fe86cc7257b9a59162cfaf2660376bdf74eb5bcb8abe238c91cb1170',
            // Custodian address to receive USDC -- Confirmed over email
            custodianAddress: '0x4c8f7a29a2c4b030bd1052754b5229d80984c1d580508eb378a6407a1ef9f1de',
            type: '0xdba34672e30cb065b1f93e3ab55318768fd6fef66c15942c9f7cb846e2f900e7::usdc::USDC',
            pyth: {
                feed: '0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a',
                identifier: 'pyth',
                priceInfoObjectId: '0x5dec622733a204ca27f5a90d8c2fad453cc6665186fd5dff13a83d0b6c9027ab',
            },
        },
        // dummy is disabled on mainnet
        dummyUsdc: {
            enable: false,
            aggregatedOracleId: '',
            custodianAddress: '',
            type: '',
            pyth: {
                feed: '',
                identifier: '',
                priceInfoObjectId: '',
            },
        }
    },
    publishData: {
        treasuryCapObjectId: '0xae5039079b0cf2bb7694c24b411ea9fc24a1a59f602ca90b0ba2b2095da54bda',
        denyCapObjectId: '0xff3d56bc2319d860710b9981485f96dda6d602a79ddaad65224fb3811db95b66',
        metadataCapObjectId: '0x392eded8007863039e22a14dbbeaef09645c99e2fd915e33937905e474dba75f',
    }
}
