import * as spotEnum from '../enum';

const { Project, Token } = spotEnum;

const tokens = Object.values(Token).join(',');

// const tokens = [
//   'bitcoin',
//   'litecoin',
//   'ethereum',
//   'avalanche-2',
//   'solana',
//   'near'
// ].join(',');

export const coingeckoBaseURL = 'https://api.coingecko.com/api/v3/';

export const url = `${'simple/price'}?ids=${tokens}&vs_currencies=${'usd'}`;

export const spotAction = {
  label: Project.SPOT_ACTION,
  action: spotEnum.Action,
  status: spotEnum.Status
};
