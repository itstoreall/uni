import { Schema } from 'mongoose';

const { String, Number } = Schema.Types;

export type SchemaType = typeof String | typeof Number | (typeof Number)[];
