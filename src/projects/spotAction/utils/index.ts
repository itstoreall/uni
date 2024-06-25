import { getIntlDate } from '../../../utils/getIntlDate';
import service from '../../../db/service';
import { getModel } from '../../../db';
// import * as gu from '../../../utils/global';
import * as projEnum from '../enum';
// import * as cache from '../cache';
import * as api from '../api';
import * as t from '../types';
import w from '../../../winston';

// const { cacheKey } = cache;
// const pricesKey = cacheKey.spotActionPrices as cache.CacheKey;
// const timestampKey = cacheKey.spotActionPriceTimestamp as cache.CacheKey;
const { Project, Action, Status, Token, Symbol } = projEnum;
const ActionModel = getModel(Project.SPOT_ACTION);

// ------ General fns:

const convertToTimestamp = (dateString: string) => {
  const [datePart, timePart] = dateString.split(' at ');
  const date = new Date(`${datePart} ${timePart}`);
  // const date = new Date(`${datePart} ${timePart} GMT+0000`);
  const timestamp = date.getTime();
  return timestamp;
};

// ------

export const updateActions = async () => {
  w.fn('updateActions');
  const isUpdated = await fetchPrices();

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
};

// ------ Prices:

export const fetchPrices = async () => {
  w.fn('fetchPrices');

  // const cachedPrices = cache.getCache(pricesKey) as t.CurrentPrices; // *
  // const cachedTimestamp = cache.getCache(timestampKey) as number;

  const params = { model: ActionModel };
  const btcAction = await service.getBTCPrise(params);
  const existiongTimestamp = convertToTimestamp(btcAction.date);

  // console.log('existiongTimestamp -->', existiongTimestamp); // 1716651001000

  const FIVE_MINUTES = 5 * 60 * 1000;

  if (existiongTimestamp) {
    const currentTime = Date.now();

    // console.log('currentTime', currentTime);
    // console.log('existiongTimestamp', existiongTimestamp);

    const timeElapsed = currentTime - existiongTimestamp;

    try {
      const prices: t.CurrentPrices = await api.getPrices();
      console.log('prices', prices);
      const isUpdated = await updatePrices(prices);
      return isUpdated ? true : false;
    } catch (e) {
      console.error('ERROR in fetchPrices:', e);
    }

    /*
    if (timeElapsed < FIVE_MINUTES) {
      // console.log('< FIVE_MINUTES', timeElapsed);
      return false;
    } else {
      try {
        const prices: t.CurrentPrices = await api.getPrices();
        console.log('prices', prices);
        const isUpdated = await updatePrices(prices);
        return isUpdated ? true : false;
      } catch (e) {
        console.error('ERROR in fetchPrices:', e);
      }
    }
    // */
  }
};

export const updatePrices = async (prices: t.CurrentPrices) => {
  const actions = await getAllActions();

  const priceMap = {
    [Symbol.BTC]: prices[Token.BITCOIN]?.usd,
    [Symbol.ETH]: prices[Token.ETHEREUM]?.usd,
    [Symbol.LTC]: prices[Token.LITECOIN]?.usd,
    [Symbol.AVAX]: prices[Token.AVALANCHE]?.usd,
    [Symbol.SOL]: prices[Token.SOLANA]?.usd,
    [Symbol.NEAR]: prices[Token.NEAR]?.usd,
    [Symbol.ARB]: prices[Token.ARBITRUM]?.usd,
    [Symbol.ATOM]: prices[Token.COSMOS]?.usd,
    [Symbol.APT]: prices[Token.APTOS]?.usd,
    [Symbol.LINK]: prices[Token.CHAINLINK]?.usd,
    // 10
    [Symbol.DOT]: prices[Token.POLKADOT]?.usd,
    [Symbol.INJ]: prices[Token.INJECTIVE]?.usd,
    [Symbol.ALGO]: prices[Token.ALGORAND]?.usd,
    [Symbol.GRT]: prices[Token.GRAPH]?.usd,
    [Symbol.FIL]: prices[Token.FILECOIN]?.usd,
    [Symbol.STRK]: prices[Token.STARKNET]?.usd,
    [Symbol.MATIC]: prices[Token.POLYGON]?.usd,
    [Symbol.EGLD]: prices[Token.MULTIVERSX]?.usd,
    [Symbol.HBAR]: prices[Token.HEDERA]?.usd,
    [Symbol.OSMO]: prices[Token.OSMOSIS]?.usd,
    // 20
    [Symbol.MINA]: prices[Token.MINA]?.usd,
    [Symbol.AXS]: prices[Token.AXIE]?.usd,
    [Symbol.TWT]: prices[Token.TRUSTWALLET]?.usd,
    [Symbol.DOGE]: prices[Token.DOGECOIN]?.usd,
    [Symbol.UNI]: prices[Token.UNISWAP]?.usd,
    [Symbol.GMX]: prices[Token.GMX]?.usd,
    [Symbol.FLOW]: prices[Token.FLOW]?.usd,
    [Symbol.RON]: prices[Token.RONIN]?.usd,
    [Symbol.JASMY]: prices[Token.JASMY]?.usd,
    [Symbol.ADA]: prices[Token.CARDANO]?.usd,
    // 30
    [Symbol.ETC]: prices[Token.ETHEREUM_CLASSIC]?.usd,
    [Symbol.SHIBA]: prices[Token.SHIBA]?.usd,
    [Symbol.SUSHI]: prices[Token.SUSHI]?.usd,
    [Symbol.BOME]: prices[Token.BOOK_OF_MEME]?.usd,
    [Symbol.SAND]: prices[Token.SAND]?.usd,
    [Symbol.RAY]: prices[Token.RAYDIUM]?.usd,
    [Symbol.XRP]: prices[Token.RIPPLE]?.usd,
    [Symbol.SUI]: prices[Token.SUI]?.usd,
    [Symbol.CETUS]: prices[Token.CETUS_PROTOCOL]?.usd,
    [Symbol.BAND]: prices[Token.BAND_PROTOCOL]?.usd,
    // 40
    [Symbol.ATA]: prices[Token.AUTOMATA]?.usd,
    [Symbol.MBOX]: prices[Token.MOBOX]?.usd,
    [Symbol.AAVE]: prices[Token.AAVE]?.usd,
    [Symbol.APE]: prices[Token.APE_COIN]?.usd,
    [Symbol.THETA]: prices[Token.THETA]?.usd,
    [Symbol.COMP]: prices[Token.COMPOUND_GOVERNANCE]?.usd,
    [Symbol.SNX]: prices[Token.SYNTHETIX_NETWORK]?.usd,
    [Symbol.CAKE]: prices[Token.PANCAKE_SWAP]?.usd,
    [Symbol.DIA]: prices[Token.DIA]?.usd,
    [Symbol.ONE_INCH]: prices[Token.ONE_INCH]?.usd,
    // 50
    [Symbol.MANTA]: prices[Token.MANTA_NETWORK]?.usd,
    [Symbol.REEF]: prices[Token.REEF]?.usd,
    [Symbol.NEO]: prices[Token.NEO]?.usd,
    [Symbol.CKB]: prices[Token.NERVOS_NETWORK]?.usd,
    [Symbol.KSM]: prices[Token.KUSAMA]?.usd,
    [Symbol.XLM]: prices[Token.STELLAR]?.usd,
    [Symbol.RDNT]: prices[Token.RADIANT_CAPITAL]?.usd,
    [Symbol.YFI]: prices[Token.YEARN_FINANCE]?.usd,
    [Symbol.ICP]: prices[Token.INTERNET_COMPUTER]?.usd,
    [Symbol.W]: prices[Token.WORMHOLE]?.usd,
    // 60
    [Symbol.TLM]: prices[Token.ALIEN_WORLDS]?.usd,
    [Symbol.JUP]: prices[Token.JUPITER]?.usd,
    [Symbol.SFP]: prices[Token.SAFEPAL]?.usd,
    [Symbol.ONT]: prices[Token.ONTOLOGY]?.usd,
    [Symbol.XVG]: prices[Token.VERGE]?.usd,
    [Symbol.BSW]: prices[Token.BISWAP]?.usd,
    [Symbol.KAVA]: prices[Token.KAVA]?.usd,
    [Symbol.ALICE]: prices[Token.MY_NEIGHBOR_ALICE]?.usd,
    [Symbol.VANRY]: prices[Token.VANAR_CHAIN]?.usd,
    [Symbol.DAR]: prices[Token.MINES_OF_DALARNIA]?.usd,
    // 70
    [Symbol.TFUEL]: prices[Token.THETA_FUEL]?.usd,
    [Symbol.ASTR]: prices[Token.ASTAR]?.usd,
    [Symbol.DODO]: prices[Token.DODO]?.usd,
    [Symbol.XCH]: prices[Token.CHIA]?.usd,
    [Symbol.LINA]: prices[Token.LINEAR]?.usd,
    [Symbol.LIT]: prices[Token.LITENTRY]?.usd,
    [Symbol.GLMR]: prices[Token.MOONBEAM]?.usd,
    [Symbol.RVN]: prices[Token.RAVENCOIN]?.usd,
    [Symbol.CELO]: prices[Token.CELO]?.usd,
    [Symbol.ANKR]: prices[Token.ANKR]?.usd,
    // 80
    [Symbol.ROSE]: prices[Token.OASIS_NETWORK]?.usd,
    [Symbol.MANA]: prices[Token.DECENTRALAND]?.usd,
    [Symbol.ZIL]: prices[Token.ZILLIQA]?.usd,
    [Symbol.EOS]: prices[Token.EOS]?.usd,
    [Symbol.EVMOS]: prices[Token.EVMOS]?.usd,
    [Symbol.IOTA]: prices[Token.IOTA]?.usd
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

      // /*
      const updatedAction = await action.save();
      if (updatedAction.token === action.token) actionCount += 1;
      // */
    }
  }

  // console.log('actionCount === actions.length', actionCount === actions.length);
  // console.log('=====>', actionCount, actions.length, actions[0]);

  return actionCount === actions.length;
};

// ------ Actions:

export const getAllActions = async () => {
  const params = { model: ActionModel };
  return await service.getAll(params);
};

export const getByStatus = async () => {
  const params = { model: ActionModel, status: 'withdrawn' };
  return await service.getByStatus(params);
};

export const existsByID = async () => {
  const params = { model: ActionModel, id: '66378383526c576e5564afd6' };
  return await service.existsByID(params);
};

type CreateActionArgs = { token: any; symbol: any };

export const createAction = async (args: CreateActionArgs) => {
  const actions = await getAllActions();
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
    updatedAt: getIntlDate()
  };

  const params = { model: ActionModel, input: actionInput };
  return await service.create(params);
  return 0;
};

export const removeAction = async () => {
  const params = { model: ActionModel, id: '664b8e13a1d72b0f6e7ab2b7' };
  return (await service.removeByID(params)).deletedCount; // 0 or 1
};
