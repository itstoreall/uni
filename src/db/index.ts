import mongoose, { ConnectOptions } from 'mongoose';
import * as ge from '../enum/global';
import model from './models';
require('dotenv').config();

mongoose.connect(process.env.MONGO_DB, {} as ConnectOptions);

export const getModel = (label: string) => {
  switch (label) {
    case ge.Project.SPOT_ACTION:
      return model.SpotAction;

    default:
      return null;
  }
};
