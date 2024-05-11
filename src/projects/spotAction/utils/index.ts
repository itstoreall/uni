import { CurrentPrices } from '../types';
import * as cache from '../cache';
import * as api from '../api';

const { cacheKey } = cache;

export const fetchPrices = async () => {
  const pricesKey = cacheKey.spotActionPrices as cache.CacheKey;
  // const cachedPrices = cache.getCache(pricesKey);
  // console.log('cachedPrices:', cachedPrices);

  try {
    const prices: CurrentPrices = await api.getPrices();
    cache.setCache(pricesKey, prices);
  } catch (e) {
    console.error('ERROR in fetchPrices:', e);
  }
};
