"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrices = void 0;
const axios_1 = __importDefault(require("axios"));
const gApi = __importStar(require("../../../api/global"));
const c = __importStar(require("../config"));
axios_1.default.defaults.baseURL = c.coingeckoBaseURL;
const { GET } = gApi.Method;
let prc = 60000.11;
const getPrices = () => __awaiter(void 0, void 0, void 0, function* () {
    prc += 1;
    const config = { method: GET, url: c.url };
    return yield gApi.makeRequest(config);
});
exports.getPrices = getPrices;
/*
import * as gu from '../../../utils/global';
import * as projEnum from '../enum';
const { Token } = projEnum;
return gu.isLocal()
  ? {
      [Token.BITCOIN]: { usd: prc },
      [Token.ETHEREUM]: { usd: 3000.22 },
      [Token.LITECOIN]: { usd: 80.33 },
      [Token.AVALANCHE]: { usd: 35.44 },
      [Token.SOLANA]: { usd: 145.55 },
      [Token.NEAR]: { usd: 7.66 },
      [Token.ARBITRUM]: { usd: 1.11 },
      [Token.COSMOS]: { usd: 8.22 },
      [Token.APTOS]: { usd: 9.33 },
      [Token.CHAINLINK]: { usd: 17.44 },
      // 10
      [Token.POLKADOT]: { usd: 7.55 },
      [Token.INJECTIVE]: { usd: 25.66 },
      [Token.ALGORAND]: { usd: 0.19 },
      [Token.GRAPH]: { usd: 0.33 },
      [Token.FILECOIN]: { usd: 5.77 },
      [Token.STARKNET]: { usd: 1.33 },
      [Token.POLYGON]: { usd: 0.88 },
      [Token.MULTIVERSX]: { usd: 40.11 },
      [Token.HEDERA]: { usd: 0.11 },
      [Token.OSMOSIS]: { usd: 0.88 },
      // 20
      [Token.MINA]: { usd: 0.88 },
      [Token.AXIE]: { usd: 8.11 },
      [Token.TRUSTWALLET]: { usd: 1.11 },
      [Token.DOGECOIN]: { usd: 0.22 },
      [Token.UNISWAP]: { usd: 10.88 },
      [Token.GMX]: { usd: 32.66 },
      [Token.FLOW]: { usd: 0.88 },
      [Token.RONIN]: { usd: 3.33 },
      [Token.JASMY]: { usd: 0.02 },
      [Token.CARDANO]: { usd: 0.44 },
      // 30
      [Token.ETHEREUM_CLASSIC]: { usd: 31.11 },
      [Token.SHIBA]: { usd: 0.000022 },
      [Token.SUSHI]: { usd: 1.22 },
      [Token.BOOK_OF_MEME]: { usd: 0.011 },
      [Token.SAND]: { usd: 0.44 },
      [Token.RAYDIUM]: { usd: 1.88 },
      [Token.RIPPLE]: { usd: 0.55 },
      [Token.SUI]: { usd: 1.11 },
      [Token.CETUS_PROTOCOL]: { usd: 0.11 },
      [Token.BAND_PROTOCOL]: { usd: 1.77 },
      // 40
      [Token.AUTOMATA]: { usd: 0.11 },
      [Token.MOBOX]: { usd: 0.33 },
      [Token.AAVE]: { usd: 106.66 },
      [Token.APE_COIN]: { usd: 1.22 },
      [Token.THETA]: { usd: 2.33 },
      [Token.COMPOUND_GOVERNANCE]: { usd: 63.11 },
      [Token.SYNTHETIX_NETWORK]: { usd: 2.99 },
      [Token.PANCAKE_SWAP]: { usd: 2.99 },
      [Token.DIA]: { usd: 0.55 },
      [Token.ONE_INCH]: { usd: 0.44 },
      // 50
      [Token.MANTA_NETWORK]: { usd: 1.77 },
      [Token.REEF]: { usd: 0.0022 },
      [Token.NEO]: { usd: 15.33 },
      [Token.NERVOS_NETWORK]: { usd: 0.011 },
      [Token.KUSAMA]: { usd: 32.88 },
      [Token.STELLAR]: { usd: 0.11 },
      [Token.RADIANT_CAPITAL]: { usd: 0.22 },
      [Token.YEARN_FINANCE]: { usd: 7282.44 },
      [Token.INTERNET_COMPUTER]: { usd: 12.22 },
      [Token.WORMHOLE]: { usd: 0.55 },
      // 60
      [Token.ALIEN_WORLDS]: { usd: 0.22 },
      [Token.JUPITER]: { usd: 0.0011 },
      [Token.SAFEPAL]: { usd: 0.77 },
      [Token.ONTOLOGY]: { usd: 0.33 },
      [Token.VERGE]: { usd: 0.0055 },
      [Token.BISWAP]: { usd: 0.088 },
      [Token.KAVA]: { usd: 0.66 },
      [Token.MY_NEIGHBOR_ALICE]: { usd: 1.33 },
      [Token.VANAR_CHAIN]: { usd: 0.22 },
      [Token.MINES_OF_DALARNIA]: { usd: 0.22 },
      // 70
      [Token.THETA_FUEL]: { usd: 0.11 },
      [Token.ASTAR]: { usd: 0.088 },
      [Token.DODO]: { usd: 0.022 },
      [Token.CHIA]: { usd: 31.33 },
      [Token.LINEAR]: { usd: 0.0088 },
      [Token.LITENTRY]: { usd: 1.11 },
      [Token.MOONBEAM]: { usd: 0.33 },
      [Token.RAVENCOIN]: { usd: 0.033 },
      [Token.CELO]: { usd: 0.88 },
      [Token.ANKR]: { usd: 0.044 },
      // 80
      [Token.OASIS_NETWORK]: { usd: 0.088 },
      [Token.DECENTRALAND]: { usd: 0.44 },
      [Token.ZILLIQA]: { usd: 0.022 },
      [Token.EOS]: { usd: 0.88 },
      [Token.EVMOS]: { usd: 0.055 },
      [Token.IOTA]: { usd: 0.22 }
    }
  : await gApi.makeRequest(config);
// */
//# sourceMappingURL=index.js.map