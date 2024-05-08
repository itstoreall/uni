import * as ge from '../enum/global';
import service from '../db/service';
import getModel from '../db';
import { SpotAction } from '../projects/spotAction/types';

const { SPOT_ACTION } = ge.Project;
const SpotActionModel = getModel(SPOT_ACTION);

export const resolvers = {
  Query: {
    getActions: async () => {
      const actions: SpotAction[] = await service.getAll(SpotActionModel);
      console.log('actions -->', actions);
      return actions;
    },

    // getActions: async () => await service.getAll(SpotActionModel),

    getUser: (_: any, args: any) => {
      console.log(1111, args.id);
      return `User ${args.id}`;
    }
  }
};
