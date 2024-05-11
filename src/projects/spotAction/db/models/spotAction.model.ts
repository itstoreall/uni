import mongoose, { Schema } from 'mongoose';
import * as dbEnums from '../../enum';
import * as spotEnum from '../../enum';

const { Project } = spotEnum;

export type SpotAction = {
  tokenId: number;
  token: string;
  action: dbEnums.Action;
  average_price: number;
  prices: number[];
  status: string;
};

const spotSchema = new Schema({
  tokenId: Number,
  token: String,
  action: {
    type: String,
    enum: Object.values(dbEnums.Action)
  },
  average_price: Schema.Types.Number,
  prices: { type: [Schema.Types.Number], default: [] },
  status: String
});

export default mongoose.model(Project.SPOT_ACTION, spotSchema);
