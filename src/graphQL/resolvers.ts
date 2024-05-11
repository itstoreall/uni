import * as ge from '../enum/global';
import service from '../db/service';
import getModel from '../db';
import { SpotAction } from '../projects/spotAction/types';

const { SPOT_ACTION } = ge.Project;
const SpotActionModel = getModel(SPOT_ACTION);

export const resolvers = {
  Query: {
    getActions: async () =>
      (await service.getAll(SpotActionModel)) as SpotAction[],

    getUser: (_: any, args: any) => {
      return `User ${args.id}`;
    }
  }
};
