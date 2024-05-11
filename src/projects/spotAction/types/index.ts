import * as projectConfig from '../../../projects/spotAction/config';

const { action } = projectConfig.spotAction;
const { status } = projectConfig.spotAction;

export type SpotAction = {
  tokenId: number;
  token: string;
  action: typeof action;
  average_price: number;
  prices: number[];
  status: typeof status;
};

export type SpotActionRes = Promise<SpotAction[]>;
