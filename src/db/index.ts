import mongoose from 'mongoose';
import * as ge from '../enum/global';
import model from './models';
require('dotenv').config();

// const { spotAction } = gc.project;

const { SPOT_ACTION } = ge.Project;

// const url = process.env.MONGO_DB;

mongoose.connect(process.env.MONGO_DB);

// const spotSchema = new Schema({
//   action: String
// });

// const SpotModel = mongoose.model('Spot', schema.spot);

// const SpotSchema = new Schema({
//   // tokenId: Number,
//   action: String
//   // average_price: BigInt,
//   // prices: { type: [Schema.Types.String], default: [] },
//   // status: String
// });

// const SpotModel = mongoose.model('spot', SpotSchema);

const getModel = (label: string) => {
  // const res = new SpotModel({ action: 'buy' });
  // await res.save();

  switch (label) {
    case SPOT_ACTION:
      return model.SpotAction;

    default:
      return null;
  }

  // const res2 = await currentModel.find({});
  // console.log('res2 ===>', res2);
};

export default getModel;

// let dbConnection;

// // const client = new MongoClient(url);

// const uniDB = {
//   connectToDB: (cb: any) => {},
//   getDB: dbConnection
// };

// export default uniDB;
