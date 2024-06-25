// import * as ge from '../enum/global';
import service from '../../../db/service';
import { getModel } from '../../../db';
import * as spotEnum from '../enum';
import * as t from '../types';
import * as u from '../utils';
import w from '../../../winston';
import { dateConfig, getIntlDate } from '../../../utils/getIntlDate';

const { Project } = spotEnum;
const ActionModel = getModel(Project.SPOT_ACTION);

const resolvers = {
  Query: {
    getActions: async () => {
      w.fn('getActions');
      const isUpdated = await u.updateActions();
      const actions = await u.getAllActions();
      const time = getIntlDate(dateConfig.format.time.label);
      const msg = `updated: ${isUpdated} ${time} ${actions?.length}`;
      w[isUpdated ? 'info' : 'err'](msg);
      return { isUpdated, actions, time };
    },

    getActionByID: async (_: any, args: { id: string }) => {
      const params = { model: ActionModel, id: args.id };
      return await service.getByID(params);
    },

    getUser: (_: any, args: any) => {
      return `User ${args.id}`;
    }
  },

  Mutation: {
    addAction: async (_: any, { input }: { input: t.SpotAction }) => {
      console.log('input ->', input);
      const params = { model: ActionModel, input };
      const addedAction = await service.create(params);
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
