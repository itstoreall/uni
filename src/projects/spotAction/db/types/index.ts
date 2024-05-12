import { Schema } from 'mongoose';

const { String, Number, Date } = Schema.Types;

export type SchemaType =
  | typeof String
  | typeof Number
  | (typeof Number)[]
  | DateConstructor;
