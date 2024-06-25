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
exports.removeAction = exports.createAction = exports.existsByID = exports.getByStatus = exports.getAllActions = exports.updatePrices = exports.fetchPrices = exports.updateActions = exports.convertToTimestamp = void 0;
const getIntlDate_1 = require("../../../utils/getIntlDate");
const service_1 = __importDefault(require("../../../db/service"));
const db_1 = require("../../../db");
// import * as gu from '../../../utils/global';
const projEnum = __importStar(require("../enum"));
const api = __importStar(require("../api"));
const winston_1 = __importDefault(require("../../../winston"));
const { Project, Action, Status, Token, Symbol } = projEnum;
const ActionModel = (0, db_1.getModel)(Project.SPOT_ACTION);
// ------ General fns:
const convertToTimestamp = (dateString) => {
    const [datePart, timePart] = dateString.split(' at ');
    const date = new Date(`${datePart} ${timePart}`); // ${timePart} GMT+0000`)
    const timestamp = date.getTime();
    return timestamp;
};
exports.convertToTimestamp = convertToTimestamp;
// ------ Update :
const updateActions = () => __awaiter(void 0, void 0, void 0, function* () {
    winston_1.default.fn('updateActions');
    const isUpdated = yield (0, exports.fetchPrices)();
    /*
    const isUpdated = await updatePrices(prices);
    if (!isUpdated) return;
    console.log('updated ====>', isUpdated);
    // */
    /*
    const actions = await getAllActions();
    const actions = await getByStatus();
    const actionID = (await existsByID())._id;
    const isRemoved = await removeAction();
    */
    /*
    const newAction = await createAction({
      token: Token.IOTA,
      symbol: Symbol.IOTA
    });
    console.log('newAction:', newAction);
    // */
    return isUpdated;
});
exports.updateActions = updateActions;
// ------ Prices:
const fetchPrices = () => __awaiter(void 0, void 0, void 0, function* () {
    winston_1.default.fn('fetchPrices');
    const params = { model: ActionModel };
    const btc = yield service_1.default.getBTCPrise(params);
    try {
        const prices = yield api.getPrices();
        // console.log('btc/prices', btc.price, prices.bitcoin.usd);
        if (prices.bitcoin.usd !== btc.price) {
            yield (0, exports.updatePrices)(prices);
            return true;
        }
        else
            return false;
    }
    catch (e) {
        winston_1.default.err(`ERROR in fetchPrices: ${e.message}`);
        return false;
    }
});
exports.fetchPrices = fetchPrices;
const updatePrices = (prices) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61;
    const actions = yield (0, exports.getAllActions)();
    const priceMap = {
        [Symbol.BTC]: (_a = prices[Token.BITCOIN]) === null || _a === void 0 ? void 0 : _a.usd,
        [Symbol.ETH]: (_b = prices[Token.ETHEREUM]) === null || _b === void 0 ? void 0 : _b.usd,
        [Symbol.LTC]: (_c = prices[Token.LITECOIN]) === null || _c === void 0 ? void 0 : _c.usd,
        [Symbol.AVAX]: (_d = prices[Token.AVALANCHE]) === null || _d === void 0 ? void 0 : _d.usd,
        [Symbol.SOL]: (_e = prices[Token.SOLANA]) === null || _e === void 0 ? void 0 : _e.usd,
        [Symbol.NEAR]: (_f = prices[Token.NEAR]) === null || _f === void 0 ? void 0 : _f.usd,
        [Symbol.ARB]: (_g = prices[Token.ARBITRUM]) === null || _g === void 0 ? void 0 : _g.usd,
        [Symbol.ATOM]: (_h = prices[Token.COSMOS]) === null || _h === void 0 ? void 0 : _h.usd,
        [Symbol.APT]: (_j = prices[Token.APTOS]) === null || _j === void 0 ? void 0 : _j.usd,
        [Symbol.LINK]: (_k = prices[Token.CHAINLINK]) === null || _k === void 0 ? void 0 : _k.usd,
        // 10
        [Symbol.DOT]: (_l = prices[Token.POLKADOT]) === null || _l === void 0 ? void 0 : _l.usd,
        [Symbol.INJ]: (_m = prices[Token.INJECTIVE]) === null || _m === void 0 ? void 0 : _m.usd,
        [Symbol.ALGO]: (_o = prices[Token.ALGORAND]) === null || _o === void 0 ? void 0 : _o.usd,
        [Symbol.GRT]: (_p = prices[Token.GRAPH]) === null || _p === void 0 ? void 0 : _p.usd,
        [Symbol.FIL]: (_q = prices[Token.FILECOIN]) === null || _q === void 0 ? void 0 : _q.usd,
        [Symbol.STRK]: (_r = prices[Token.STARKNET]) === null || _r === void 0 ? void 0 : _r.usd,
        [Symbol.MATIC]: (_s = prices[Token.POLYGON]) === null || _s === void 0 ? void 0 : _s.usd,
        [Symbol.EGLD]: (_t = prices[Token.MULTIVERSX]) === null || _t === void 0 ? void 0 : _t.usd,
        [Symbol.HBAR]: (_u = prices[Token.HEDERA]) === null || _u === void 0 ? void 0 : _u.usd,
        [Symbol.OSMO]: (_v = prices[Token.OSMOSIS]) === null || _v === void 0 ? void 0 : _v.usd,
        // 20
        [Symbol.MINA]: (_w = prices[Token.MINA]) === null || _w === void 0 ? void 0 : _w.usd,
        [Symbol.AXS]: (_x = prices[Token.AXIE]) === null || _x === void 0 ? void 0 : _x.usd,
        [Symbol.TWT]: (_y = prices[Token.TRUSTWALLET]) === null || _y === void 0 ? void 0 : _y.usd,
        [Symbol.DOGE]: (_z = prices[Token.DOGECOIN]) === null || _z === void 0 ? void 0 : _z.usd,
        [Symbol.UNI]: (_0 = prices[Token.UNISWAP]) === null || _0 === void 0 ? void 0 : _0.usd,
        [Symbol.GMX]: (_1 = prices[Token.GMX]) === null || _1 === void 0 ? void 0 : _1.usd,
        [Symbol.FLOW]: (_2 = prices[Token.FLOW]) === null || _2 === void 0 ? void 0 : _2.usd,
        [Symbol.RON]: (_3 = prices[Token.RONIN]) === null || _3 === void 0 ? void 0 : _3.usd,
        [Symbol.JASMY]: (_4 = prices[Token.JASMY]) === null || _4 === void 0 ? void 0 : _4.usd,
        [Symbol.ADA]: (_5 = prices[Token.CARDANO]) === null || _5 === void 0 ? void 0 : _5.usd,
        // 30
        [Symbol.ETC]: (_6 = prices[Token.ETHEREUM_CLASSIC]) === null || _6 === void 0 ? void 0 : _6.usd,
        [Symbol.SHIBA]: (_7 = prices[Token.SHIBA]) === null || _7 === void 0 ? void 0 : _7.usd,
        [Symbol.SUSHI]: (_8 = prices[Token.SUSHI]) === null || _8 === void 0 ? void 0 : _8.usd,
        [Symbol.BOME]: (_9 = prices[Token.BOOK_OF_MEME]) === null || _9 === void 0 ? void 0 : _9.usd,
        [Symbol.SAND]: (_10 = prices[Token.SAND]) === null || _10 === void 0 ? void 0 : _10.usd,
        [Symbol.RAY]: (_11 = prices[Token.RAYDIUM]) === null || _11 === void 0 ? void 0 : _11.usd,
        [Symbol.XRP]: (_12 = prices[Token.RIPPLE]) === null || _12 === void 0 ? void 0 : _12.usd,
        [Symbol.SUI]: (_13 = prices[Token.SUI]) === null || _13 === void 0 ? void 0 : _13.usd,
        [Symbol.CETUS]: (_14 = prices[Token.CETUS_PROTOCOL]) === null || _14 === void 0 ? void 0 : _14.usd,
        [Symbol.BAND]: (_15 = prices[Token.BAND_PROTOCOL]) === null || _15 === void 0 ? void 0 : _15.usd,
        // 40
        [Symbol.ATA]: (_16 = prices[Token.AUTOMATA]) === null || _16 === void 0 ? void 0 : _16.usd,
        [Symbol.MBOX]: (_17 = prices[Token.MOBOX]) === null || _17 === void 0 ? void 0 : _17.usd,
        [Symbol.AAVE]: (_18 = prices[Token.AAVE]) === null || _18 === void 0 ? void 0 : _18.usd,
        [Symbol.APE]: (_19 = prices[Token.APE_COIN]) === null || _19 === void 0 ? void 0 : _19.usd,
        [Symbol.THETA]: (_20 = prices[Token.THETA]) === null || _20 === void 0 ? void 0 : _20.usd,
        [Symbol.COMP]: (_21 = prices[Token.COMPOUND_GOVERNANCE]) === null || _21 === void 0 ? void 0 : _21.usd,
        [Symbol.SNX]: (_22 = prices[Token.SYNTHETIX_NETWORK]) === null || _22 === void 0 ? void 0 : _22.usd,
        [Symbol.CAKE]: (_23 = prices[Token.PANCAKE_SWAP]) === null || _23 === void 0 ? void 0 : _23.usd,
        [Symbol.DIA]: (_24 = prices[Token.DIA]) === null || _24 === void 0 ? void 0 : _24.usd,
        [Symbol.ONE_INCH]: (_25 = prices[Token.ONE_INCH]) === null || _25 === void 0 ? void 0 : _25.usd,
        // 50
        [Symbol.MANTA]: (_26 = prices[Token.MANTA_NETWORK]) === null || _26 === void 0 ? void 0 : _26.usd,
        [Symbol.REEF]: (_27 = prices[Token.REEF]) === null || _27 === void 0 ? void 0 : _27.usd,
        [Symbol.NEO]: (_28 = prices[Token.NEO]) === null || _28 === void 0 ? void 0 : _28.usd,
        [Symbol.CKB]: (_29 = prices[Token.NERVOS_NETWORK]) === null || _29 === void 0 ? void 0 : _29.usd,
        [Symbol.KSM]: (_30 = prices[Token.KUSAMA]) === null || _30 === void 0 ? void 0 : _30.usd,
        [Symbol.XLM]: (_31 = prices[Token.STELLAR]) === null || _31 === void 0 ? void 0 : _31.usd,
        [Symbol.RDNT]: (_32 = prices[Token.RADIANT_CAPITAL]) === null || _32 === void 0 ? void 0 : _32.usd,
        [Symbol.YFI]: (_33 = prices[Token.YEARN_FINANCE]) === null || _33 === void 0 ? void 0 : _33.usd,
        [Symbol.ICP]: (_34 = prices[Token.INTERNET_COMPUTER]) === null || _34 === void 0 ? void 0 : _34.usd,
        [Symbol.W]: (_35 = prices[Token.WORMHOLE]) === null || _35 === void 0 ? void 0 : _35.usd,
        // 60
        [Symbol.TLM]: (_36 = prices[Token.ALIEN_WORLDS]) === null || _36 === void 0 ? void 0 : _36.usd,
        [Symbol.JUP]: (_37 = prices[Token.JUPITER]) === null || _37 === void 0 ? void 0 : _37.usd,
        [Symbol.SFP]: (_38 = prices[Token.SAFEPAL]) === null || _38 === void 0 ? void 0 : _38.usd,
        [Symbol.ONT]: (_39 = prices[Token.ONTOLOGY]) === null || _39 === void 0 ? void 0 : _39.usd,
        [Symbol.XVG]: (_40 = prices[Token.VERGE]) === null || _40 === void 0 ? void 0 : _40.usd,
        [Symbol.BSW]: (_41 = prices[Token.BISWAP]) === null || _41 === void 0 ? void 0 : _41.usd,
        [Symbol.KAVA]: (_42 = prices[Token.KAVA]) === null || _42 === void 0 ? void 0 : _42.usd,
        [Symbol.ALICE]: (_43 = prices[Token.MY_NEIGHBOR_ALICE]) === null || _43 === void 0 ? void 0 : _43.usd,
        [Symbol.VANRY]: (_44 = prices[Token.VANAR_CHAIN]) === null || _44 === void 0 ? void 0 : _44.usd,
        [Symbol.DAR]: (_45 = prices[Token.MINES_OF_DALARNIA]) === null || _45 === void 0 ? void 0 : _45.usd,
        // 70
        [Symbol.TFUEL]: (_46 = prices[Token.THETA_FUEL]) === null || _46 === void 0 ? void 0 : _46.usd,
        [Symbol.ASTR]: (_47 = prices[Token.ASTAR]) === null || _47 === void 0 ? void 0 : _47.usd,
        [Symbol.DODO]: (_48 = prices[Token.DODO]) === null || _48 === void 0 ? void 0 : _48.usd,
        [Symbol.XCH]: (_49 = prices[Token.CHIA]) === null || _49 === void 0 ? void 0 : _49.usd,
        [Symbol.LINA]: (_50 = prices[Token.LINEAR]) === null || _50 === void 0 ? void 0 : _50.usd,
        [Symbol.LIT]: (_51 = prices[Token.LITENTRY]) === null || _51 === void 0 ? void 0 : _51.usd,
        [Symbol.GLMR]: (_52 = prices[Token.MOONBEAM]) === null || _52 === void 0 ? void 0 : _52.usd,
        [Symbol.RVN]: (_53 = prices[Token.RAVENCOIN]) === null || _53 === void 0 ? void 0 : _53.usd,
        [Symbol.CELO]: (_54 = prices[Token.CELO]) === null || _54 === void 0 ? void 0 : _54.usd,
        [Symbol.ANKR]: (_55 = prices[Token.ANKR]) === null || _55 === void 0 ? void 0 : _55.usd,
        // 80
        [Symbol.ROSE]: (_56 = prices[Token.OASIS_NETWORK]) === null || _56 === void 0 ? void 0 : _56.usd,
        [Symbol.MANA]: (_57 = prices[Token.DECENTRALAND]) === null || _57 === void 0 ? void 0 : _57.usd,
        [Symbol.ZIL]: (_58 = prices[Token.ZILLIQA]) === null || _58 === void 0 ? void 0 : _58.usd,
        [Symbol.EOS]: (_59 = prices[Token.EOS]) === null || _59 === void 0 ? void 0 : _59.usd,
        [Symbol.EVMOS]: (_60 = prices[Token.EVMOS]) === null || _60 === void 0 ? void 0 : _60.usd,
        [Symbol.IOTA]: (_61 = prices[Token.IOTA]) === null || _61 === void 0 ? void 0 : _61.usd
    };
    // let actionCount: number = 0;
    const calculatePercentage = (action, price) => {
        const rawPercent = action.average_price
            ? (price / action.average_price) * 100
            : 0;
        const fixedValue = rawPercent.toFixed();
        const numberValue = Number(fixedValue);
        return typeof numberValue === 'number' ? numberValue : 0;
    };
    for (const action of actions) {
        const newPrice = priceMap[action.token];
        if (newPrice) {
            const currentPrice = priceMap[action.token];
            action.current_price = newPrice;
            action.percent = calculatePercentage(action, currentPrice);
            action.updatedAt = (0, getIntlDate_1.getIntlDate)();
            yield action.save();
            // /*
            // const updatedAction = await action.save();
            // if (updatedAction.token === action.token) actionCount += 1;
            // */
        }
    }
    // console.log('actionCount === actions.length', actionCount === actions.length);
    // console.log('=====>', actionCount, actions.length, actions[0]);
    // return actionCount === actions.length;
    // return true;
});
exports.updatePrices = updatePrices;
// ------ Actions:
const getAllActions = () => __awaiter(void 0, void 0, void 0, function* () {
    const params = { model: ActionModel };
    return yield service_1.default.getAll(params);
});
exports.getAllActions = getAllActions;
const getByStatus = () => __awaiter(void 0, void 0, void 0, function* () {
    const params = { model: ActionModel, status: 'withdrawn' };
    return yield service_1.default.getByStatus(params);
});
exports.getByStatus = getByStatus;
const existsByID = () => __awaiter(void 0, void 0, void 0, function* () {
    const params = { model: ActionModel, id: '66378383526c576e5564afd6' };
    return yield service_1.default.existsByID(params);
});
exports.existsByID = existsByID;
const createAction = (args) => __awaiter(void 0, void 0, void 0, function* () {
    const actions = yield (0, exports.getAllActions)();
    // const prices = cache.getCache(pricesKey) as t.CurrentPrices;
    const id = actions.length ? actions[actions.length - 1].tokenId : 0;
    // const price = prices[Token.IOTA];
    const token = Symbol.IOTA;
    // const price = prices[args.token];
    // const token = Symbol.IOTA;
    // TODO:
    const actionInput = {
        tokenId: id + 1,
        token: token,
        action: Action.INIT,
        average_price: 0, // target
        current_price: 0,
        // current_price: price ? price.usd : 0,
        prices: [0], // target
        percent: 0,
        status: Status.INIT,
        updatedAt: (0, getIntlDate_1.getIntlDate)()
    };
    const params = { model: ActionModel, input: actionInput };
    return yield service_1.default.create(params);
    return 0;
});
exports.createAction = createAction;
const removeAction = () => __awaiter(void 0, void 0, void 0, function* () {
    const params = { model: ActionModel, id: '664b8e13a1d72b0f6e7ab2b7' };
    return (yield service_1.default.removeByID(params)).deletedCount; // 0 or 1
});
exports.removeAction = removeAction;
//# sourceMappingURL=index.js.map