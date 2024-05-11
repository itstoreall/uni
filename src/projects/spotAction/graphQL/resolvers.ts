// import * as ge from '../enum/global';
import service from '../../../db/service';
import * as spotEnum from '../enum';
import getModel from '../../../db';
import * as t from '../types';

const { Project } = spotEnum;
const SpotActionModel = getModel(Project.SPOT_ACTION);

const resolvers = {
  Query: {
    getActions: async () =>
      (await service.getAll(SpotActionModel)) as t.SpotAction[],

    getUser: (_: any, args: any) => {
      return `User ${args.id}`;
    }
  }
};

export default resolvers;
