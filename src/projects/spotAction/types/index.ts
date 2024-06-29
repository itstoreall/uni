import { Token, Action, Status } from '../enum';

export type CurrentPrices = Record<Token, { usd: number }>;

export type SpotAction = {
  tokenId: number;
  token: string;
  action: Action;
  average_price: number;
  current_price: number;
  prices: number[];
  percent: number;
  status: Status;
};

export type IdArg = { id: string };
export type InputArg = { input: SpotAction };
export type IdInputArgs = IdArg & InputArg;

export type SpotActionRes = Promise<SpotAction[]>;
