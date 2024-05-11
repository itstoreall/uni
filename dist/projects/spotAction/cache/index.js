"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delCache = exports.setCache = exports.getCache = exports.cacheKey = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
const cacheKey = {
    spotActionPrices: 'spot_action_prices'
};
exports.cacheKey = cacheKey;
const cache = new node_cache_1.default({ stdTTL: 0 }); // 86400 (24h)
const getCache = (k) => cache.get(k);
exports.getCache = getCache;
const setCache = (k, p) => cache.set(k, p);
exports.setCache = setCache;
const delCache = (k) => cache.del(k);
exports.delCache = delCache;
// export { CacheKey };
//# sourceMappingURL=index.js.map