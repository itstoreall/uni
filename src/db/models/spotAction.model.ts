import mongoose, { Schema } from 'mongoose';
import * as ge from '../../enum/global';

const { SPOT_ACTION } = ge.Project;

const spotSchema = new Schema({
  tokenId: Number,
  token: String,
  action: String,
  average_price: Schema.Types.Number,
  prices: { type: [Schema.Types.Number], default: [] },
  status: String
});

export default mongoose.model(SPOT_ACTION, spotSchema);
