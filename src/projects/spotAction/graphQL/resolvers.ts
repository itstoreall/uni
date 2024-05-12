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
  },

  Mutation: {
    addAction: async (_: any, args: { input: t.SpotAction }) => {
      console.log('input ->', args.input);
      const addedAction = await service.create(SpotActionModel, args.input);
      console.log('addedAction:', addedAction);
      return addedAction as t.SpotAction;
    }

    /*
    updateUser: async (_: any, args: { id: string; input: t.UserInput }) => {
      // Assuming you have a service method to update a user and it returns the updated user
      const updatedUser = await service.updateUser(args.id, args.input);
      return updatedUser;
    }
    */
  }
};

export default resolvers;
