import * as projectConfig from '../../../projects/spotAction/config';
import { Token } from '../enum';

const { action } = projectConfig.spotAction;
const { status } = projectConfig.spotAction;

export type CurrentPrices = Record<Token, { usd: number }>;

export type SpotAction = {
  tokenId: number;
  token: string;
  action: typeof action;
  average_price: number;
  prices: number[];
  status: typeof status;
};

export type SpotActionRes = Promise<SpotAction[]>;
