import { Model } from 'mongoose';
import { Symbol } from '../../projects/spotAction/enum';
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

const getBTCPrise = async ({ model }: ModelArg) => {
  const btc = await makeRequest(() => model.findOne({ token: Symbol.BTC }));
  return { price: btc.current_price, date: btc.updatedAt };
  // return await makeRequest(() => model.find({ token: Token.BITCOIN }));
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

const updateByID = async ({ model, id: _id, input }: UpdateArgs) => {
  return await makeRequest(() => model.updateOne({ _id }, { ...input }));
};

const removeByID = async ({ model, id }: IDArgs) => {
  return await makeRequest(() => model.deleteOne({ _id: id }));
};

const makeRequest: MakeRequest = async cb => {
  try {
    return await cb();
  } catch (e) {
    console.error(`ERROR in makeRequest: ${e.message}`);
  }
};

export default {
  getAll,
  getByID,
  getBTCPrise,
  getByStatus,
  existsByID,
  create,
  updateByID,
  removeByID
};
