import { Model } from 'mongoose';
import * as t from '../../projects/spotAction/types';

const getAll = async (model: typeof Model): t.SpotActionRes => {
  return await model.find({});
};

const create = async (model: typeof Model, input: t.SpotAction) =>
  await model.create(input);

export default { getAll, create };
