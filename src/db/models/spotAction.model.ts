import mongoose, { Schema } from 'mongoose';
import * as ge from '../../enum/global';

const { SPOT_ACTION } = ge.Project;

export type SpotAction = {
  tokenId: number;
  token: string;
  action: EAction;
  average_price: number;
  prices: number[];
  status: string;
};

export enum EAction {
  BUY = 'buy',
  SEL = 'sell'
}

export enum EStatus {
  BUY = 'invested',
  SEL = 'sell'
}

const spotSchema = new Schema({
  tokenId: Number,
  token: String,
  action: {
    type: String,
    enum: Object.values(EAction) // Use the enum to validate the `action` field values
  },
  average_price: Schema.Types.Number,
  prices: { type: [Schema.Types.Number], default: [] },
  status: String
});

export default mongoose.model(SPOT_ACTION, spotSchema);
