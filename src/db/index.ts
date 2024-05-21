import mongoose, { ConnectOptions } from 'mongoose';
import * as spotEnum from '../projects/spotAction/enum';
import model from './models';
require('dotenv').config();

const { Project } = spotEnum;

mongoose.connect(process.env.MONGO_DB, {} as ConnectOptions);

export const getModel = (label: string) => {
  switch (label) {
    case Project.SPOT_ACTION:
      return model.SpotAction;

    default:
      return null;
  }
};
