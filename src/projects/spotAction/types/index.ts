import * as projectConfig from '../../../projects/spotAction/config';

export type SpotAction = {
  tokenId: number;
  token: string;
  action: typeof projectConfig.spotAction.action.BUY;
  average_price: number;
  prices: number[];
  status: typeof projectConfig.spotAction.status.INVESTED;
};

export type SpotActionRes = Promise<SpotAction[]>;
