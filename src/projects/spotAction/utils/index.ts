import { getIntlDate } from '../../../utils/getIntlDate';
import service from '../../../db/service';
import { getModel } from '../../../db';
// import * as gu from '../../../utils/global';
import * as projEnum from '../enum';
import * as cache from '../cache';
import * as api from '../api';
import * as t from '../types';

const { cacheKey } = cache;
const pricesKey = cacheKey.spotActionPrices as cache.CacheKey;
const { Project, Action, Status, Token, Symbol } = projEnum;
const { SPOT_ACTION } = Project;
const SpotActionModel = getModel(SPOT_ACTION);

export const updateActions = async () => {
  const prices = await fetchPrices();

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

  const newAction = await createAction();
  console.log('newAction:', newAction);
};

// ------ Prices:

export const fetchPrices = async () => {
  /* ------ Cache:
  const cachedPrices = cache.getCache(pricesKey); // *
  console.log('cachedPrices:', cachedPrices); // *
  // */

  try {
    const prices: t.CurrentPrices = await api.getPrices();
    cache.setCache(pricesKey, prices);
    return prices;
  } catch (e) {
    console.error('ERROR in fetchPrices:', e);
  }
};

export const updatePrices = async (prices: t.CurrentPrices) => {
  const actions = await getAllActions();

  const priceMap = {
    [Symbol.BTC]: prices[Token.BITCOIN].usd,
    [Symbol.ETH]: prices[Token.ETHEREUM].usd,
    [Symbol.LTC]: prices[Token.LITECOIN].usd,
    [Symbol.AVAX]: prices[Token.AVALANCHE].usd,
    [Symbol.SOL]: prices[Token.SOLANA].usd
  };

  let actionCount: number = 0;

  const calculatePercentage = (action: t.SpotAction, price: number) => {
    const rawPercent = action.average_price
      ? (price / action.average_price) * 100
      : 0;

    const fixedValue = rawPercent.toFixed();
    const numberValue = Number(fixedValue);
    return typeof numberValue === 'number' ? numberValue : 0;
  };

  for (const action of actions) {
    const newPrice = priceMap[action.token as keyof typeof priceMap];

    if (newPrice) {
      const currentPrice = priceMap[action.token as keyof typeof priceMap];

      action.current_price = newPrice;
      action.percent = calculatePercentage(action, currentPrice);
      action.updatedAt = getIntlDate();

      const updatedAction = await action.save();

      if (updatedAction.token === action.token) actionCount += 1;
    }
  }

  return actionCount === actions.length;
};

// ------ Actions:

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
  const actions = await getAllActions();
  console.log('actions', actions);

  const prices = cache.getCache(pricesKey) as t.CurrentPrices; // *
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
    updatedAt: getIntlDate()
  };

  const params = { model: SpotActionModel, input: actionInput };
  // return await service.create(params);
  return 0;
};

export const removeAction = async () => {
  const params = { model: SpotActionModel, id: '664b8e13a1d72b0f6e7ab2b7' };
  return (await service.removeByID(params)).deletedCount; // 0 or 1
};
