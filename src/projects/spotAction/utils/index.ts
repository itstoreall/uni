import service from '../../../db/service';
import { getModel } from '../../../db';
import * as spotActionEnum from '../enum';
import { CurrentPrices } from '../types';
import * as cache from '../cache';
import * as api from '../api';

const { Project, Action, Status } = spotActionEnum;
const { SPOT_ACTION } = Project;
const SpotActionModel = getModel(SPOT_ACTION);
const { cacheKey } = cache;

export const cronFn = async () => {
  const prices = await fetchPrices();
  console.log('* cronFn');
  console.log('prices:', prices);

  /*
  const actions = await getAllActions();
  const actions = await getByStatus();
  const actionID = (await existsByID())._id;
  const newAction = await createAction();
  const isRemoved = await removeAction();
  */
};

export const fetchPrices = async () => {
  const pricesKey = cacheKey.spotActionPrices as cache.CacheKey;
  // const cachedPrices = cache.getCache(pricesKey);
  // console.log('cachedPrices:', cachedPrices);

  try {
    const prices: CurrentPrices = await api.getPrices();
    cache.setCache(pricesKey, prices);
    return prices;
  } catch (e) {
    console.error('ERROR in fetchPrices:', e);
  }
};

export const getAllActions = async () => {
  const params = { model: SpotActionModel };
  return await service.getAll(params);
};

export const getByStatus = async () => {
  const params = { model: SpotActionModel, status: 'withdrawn' };
  return await service.getByStatus(params);
};

export const existsByID = async () => {
  const params = { model: SpotActionModel, id: '66378383526c576e5564afd6' };
  return await service.existsByID(params);
};

export const createAction = async () => {
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
  return await service.create(params);
};

export const removeAction = async () => {
  const params = { model: SpotActionModel, id: '664b8e13a1d72b0f6e7ab2b7' };
  return (await service.removeByID(params)).deletedCount; // 0 or 1
};
