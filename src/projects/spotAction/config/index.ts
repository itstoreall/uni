import * as ge from '../../../enum/global';

enum Action {
  BUY = 'buy',
  SELL = 'sell'
}

enum Status {
  INVESTED = 'invested',
  WITHDRAWN = 'withdrawn'
}

export const spotAction = {
  label: ge.Project.SPOT_ACTION,
  action: Action,
  status: Status
};
