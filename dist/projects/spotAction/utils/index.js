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
exports.removeAction = exports.createAction = exports.existsByID = exports.getByStatus = exports.getAllActions = exports.updatePrices = exports.fetchPrices = exports.updateActions = void 0;
const getIntlDate_1 = require("../../../utils/getIntlDate");
const service_1 = __importDefault(require("../../../db/service"));
const db_1 = require("../../../db");
// import * as gu from '../../../utils/global';
const projEnum = __importStar(require("../enum"));
const cache = __importStar(require("../cache"));
const api = __importStar(require("../api"));
const { cacheKey } = cache;
const pricesKey = cacheKey.spotActionPrices;
const { Project, Action, Status, Token, Symbol } = projEnum;
const { SPOT_ACTION } = Project;
const SpotActionModel = (0, db_1.getModel)(SPOT_ACTION);
const updateActions = () => __awaiter(void 0, void 0, void 0, function* () {
    const prices = yield (0, exports.fetchPrices)();
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
    const newAction = yield (0, exports.createAction)();
    console.log('newAction:', newAction);
});
exports.updateActions = updateActions;
// ------ Prices:
const fetchPrices = () => __awaiter(void 0, void 0, void 0, function* () {
    /* ------ Cache:
    const cachedPrices = cache.getCache(pricesKey); // *
    console.log('cachedPrices:', cachedPrices); // *
    // */
    try {
        const prices = yield api.getPrices();
        cache.setCache(pricesKey, prices);
        return prices;
    }
    catch (e) {
        console.error('ERROR in fetchPrices:', e);
    }
});
exports.fetchPrices = fetchPrices;
const updatePrices = (prices) => __awaiter(void 0, void 0, void 0, function* () {
    const actions = yield (0, exports.getAllActions)();
    const priceMap = {
        [Symbol.BTC]: prices[Token.BITCOIN].usd,
        [Symbol.ETH]: prices[Token.ETHEREUM].usd,
        [Symbol.LTC]: prices[Token.LITECOIN].usd,
        [Symbol.AVAX]: prices[Token.AVALANCHE].usd,
        [Symbol.SOL]: prices[Token.SOLANA].usd
    };
    let actionCount = 0;
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
            const updatedAction = yield action.save();
            if (updatedAction.token === action.token)
                actionCount += 1;
        }
    }
    return actionCount === actions.length;
});
exports.updatePrices = updatePrices;
// ------ Actions:
const getAllActions = () => __awaiter(void 0, void 0, void 0, function* () {
    const params = { model: SpotActionModel };
    return yield service_1.default.getAll(params);
});
exports.getAllActions = getAllActions;
const getByStatus = () => __awaiter(void 0, void 0, void 0, function* () {
    const params = { model: SpotActionModel, status: 'withdrawn' };
    return yield service_1.default.getByStatus(params);
});
exports.getByStatus = getByStatus;
const existsByID = () => __awaiter(void 0, void 0, void 0, function* () {
    const params = { model: SpotActionModel, id: '66378383526c576e5564afd6' };
    return yield service_1.default.existsByID(params);
});
exports.existsByID = existsByID;
const createAction = () => __awaiter(void 0, void 0, void 0, function* () {
    const actions = yield (0, exports.getAllActions)();
    console.log('actions', actions);
    const prices = cache.getCache(pricesKey); // *
    // console.log('cachedPrices:', prices[Token.BITCOIN].usd); // *
    const id = actions.length ? actions[actions.length - 1].tokenId : 0;
    // console.log('id', id);
    // const tokenId = id ? (id === actions.length ? id + 1 : 1) : 1;
    // console.log('tokenId', tokenId);
    // const tokenId = isLength;
    // console.log('isActions', isLength);
    const actionInput = {
        tokenId: id + 1,
        token: Symbol.SOL,
        action: Action.INIT,
        average_price: 0, // target
        current_price: prices[Token.SOLANA].usd,
        prices: [0], // target
        percent: 0,
        status: Status.INIT,
        updatedAt: (0, getIntlDate_1.getIntlDate)()
    };
    const params = { model: SpotActionModel, input: actionInput };
    // return await service.create(params);
    return 0;
});
exports.createAction = createAction;
const removeAction = () => __awaiter(void 0, void 0, void 0, function* () {
    const params = { model: SpotActionModel, id: '664b8e13a1d72b0f6e7ab2b7' };
    return (yield service_1.default.removeByID(params)).deletedCount; // 0 or 1
});
exports.removeAction = removeAction;
//# sourceMappingURL=index.js.map