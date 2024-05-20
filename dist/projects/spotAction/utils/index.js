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
exports.removeAction = exports.createAction = exports.existsByID = exports.getByStatus = exports.getAllActions = exports.fetchPrices = exports.cronFn = void 0;
const service_1 = __importDefault(require("../../../db/service"));
const db_1 = require("../../../db");
const spotActionEnum = __importStar(require("../enum"));
const cache = __importStar(require("../cache"));
const api = __importStar(require("../api"));
const { Project, Action, Status } = spotActionEnum;
const { SPOT_ACTION } = Project;
const SpotActionModel = (0, db_1.getModel)(SPOT_ACTION);
const { cacheKey } = cache;
const cronFn = () => __awaiter(void 0, void 0, void 0, function* () {
    const prices = yield (0, exports.fetchPrices)();
    console.log('* cronFn');
    console.log('prices:', prices);
    /*
    const actions = await getAllActions();
    const actions = await getByStatus();
    const actionID = (await existsByID())._id;
    const newAction = await createAction();
    const isRemoved = await removeAction();
    */
});
exports.cronFn = cronFn;
const fetchPrices = () => __awaiter(void 0, void 0, void 0, function* () {
    const pricesKey = cacheKey.spotActionPrices;
    // const cachedPrices = cache.getCache(pricesKey);
    // console.log('cachedPrices:', cachedPrices);
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
    const actionInput = {
        tokenId: 5,
        token: 'sol',
        action: Action.BUY,
        average_price: 15.5,
        current_price: 15.5,
        prices: [10, 21],
        percent: 8,
        status: Status.INVESTED
    };
    const params = { model: SpotActionModel, input: actionInput };
    return yield service_1.default.create(params);
});
exports.createAction = createAction;
const removeAction = () => __awaiter(void 0, void 0, void 0, function* () {
    const params = { model: SpotActionModel, id: '664b8e13a1d72b0f6e7ab2b7' };
    return (yield service_1.default.removeByID(params)).deletedCount; // 0 or 1
});
exports.removeAction = removeAction;
//# sourceMappingURL=index.js.map