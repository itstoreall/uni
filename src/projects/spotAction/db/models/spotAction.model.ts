import mongoose from 'mongoose';
import * as spotEnum from '../../enum';
import { SchemaType } from '../types';

const { Project } = spotEnum;
const { String, Number } = mongoose.Schema.Types;

const required = (ts: SchemaType, rest?: {}) => {
  return { type: ts, required: true, ...rest };
};

const setEnum = <E>(enm: { [s: string]: E }) => {
  return { enum: Object.values(enm) as Array<E>, lowercase: true };
};

const setDate = (immutable: boolean, dateNow: number) => {
  return { type: Date, immutable, default: dateNow };
};

const spotSchema = new mongoose.Schema({
  tokenId: required(Number, { min: 1 }),
  token: required(String),
  action: required(String, setEnum(spotEnum.Action)),
  average_price: required(Number),
  current_price: required(Number),
  prices: required([Number], { default: [] }),
  percent: required(Number),
  status: required(String, setEnum(spotEnum.Status)),
  createdAt: required(Date, setDate(true, Date.now())),
  updatedAt: required(Date, setDate(false, Date.now()))
});

export default mongoose.model(Project.SPOT_ACTION, spotSchema);
