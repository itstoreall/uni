import { Model } from 'mongoose';
import * as t from '../../projects/spotAction/types';

export type ModelArg = { model: typeof Model };

export type CreateArgs = ModelArg & { input: t.SpotAction };

export type GetByIDArgs = ModelArg & { id: string };

const getAll = async ({ model }: ModelArg): t.SpotActionRes => {
  return await model.find({});
};

// const getAll = async (model: typeof Model): t.SpotActionRes => {
//   return await model.find({});
// };

const getByID = async ({ model, id }: GetByIDArgs) => {
  return await model.findById(id);
};

const create = async ({ model, input }: CreateArgs) =>
  await model.create(input);

export default { getAll, getByID, create };
