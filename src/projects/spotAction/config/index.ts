import * as spotEnum from '../enum';

const { Project, Token } = spotEnum;

export const spotAction = {
  label: Project.SPOT_ACTION
};

const tokens = Object.values(Token).join(',');

export const coingeckoBaseURL = 'https://api.coingecko.com/api/v3/';

export const url = `${'simple/price'}?ids=${tokens}&vs_currencies=${'usd'}`;
