import NodeCache from 'node-cache';
import * as spotEnum from '../enum';

const { SPOT_ACTION } = spotEnum.Project;

export type CacheKey = (typeof cacheKey)[keyof typeof cacheKey];

const cacheKey = {
  spotActionPrices: `${SPOT_ACTION}_prices`
};

const cache = new NodeCache({ stdTTL: 0 }); // 86400 (24h)

const getCache = (k: CacheKey) => cache.get(k);
const setCache = (k: CacheKey, p: any) => cache.set(k, p);
const delCache = (k: CacheKey) => cache.del(k);

export { cacheKey, getCache, setCache, delCache };
