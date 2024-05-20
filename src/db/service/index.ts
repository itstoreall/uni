import { Model } from 'mongoose';
import * as t from '../../projects/spotAction/types';

export type ModelArg = { model: typeof Model };

export type GetByStatusArgs = ModelArg & { status: string };

export type CreateArgs = ModelArg & { input: t.SpotAction };

export type IDArgs = ModelArg & { id: string };

export type UpdateArgs = IDArgs & { input: t.SpotAction | t.SpotAction[] };

export type MakeRequest = <T>(cb: () => Promise<T>) => Promise<T>;

// ------

const getAll = async ({ model }: ModelArg) => {
  return await makeRequest(() => model.find({}));
};

const getByID = async ({ model, id }: IDArgs) => {
  return await makeRequest(() => model.findById(id));
};

const getByStatus = async ({ model, status }: GetByStatusArgs) => {
  return await makeRequest(() => model.find({ status }));
};

const existsByID = async ({ model, id }: IDArgs) => {
  return await makeRequest(() => model.exists({ _id: id }));
};

const create = async ({ model, input }: CreateArgs) => {
  return await makeRequest(() => model.create(input));
};

const updateByID = async ({ model, id, input }: UpdateArgs) => {
  return await makeRequest(() => model.create({ _id: id }, { ...input }));
};

const removeByID = async ({ model, id }: IDArgs) => {
  return await makeRequest(() => model.deleteOne({ _id: id }));
};

const makeRequest: MakeRequest = async cb => {
  try {
    return await cb();
  } catch (e) {
    throw new Error('((((((');
  }
};

export default {
  getAll,
  getByID,
  getByStatus,
  existsByID,
  create,
  updateByID,
  removeByID
};
