import mongoose from 'mongoose';
import * as ge from '../enum/global';
import model from './models';
require('dotenv').config();

const { SPOT_ACTION } = ge.Project;

mongoose.connect(process.env.MONGO_DB);

const getModel = (label: string) => {
  switch (label) {
    case SPOT_ACTION:
      return model.SpotAction;

    default:
      return null;
  }
};

export default getModel;
