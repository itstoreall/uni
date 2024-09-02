import * as ge from '../../../enum/global';
import * as projEnum from '../enum';

const { Token } = projEnum;

export const spotAction = {
  label: ge.Project.SPOT_ACTION
};

const tokens = Object.values(Token).join(',');

export const coingeckoBaseURL = 'https://api.coingecko.com/api/v3/';

export const url = `simple/price?ids=${tokens}&vs_currencies=${'usd'}`;
