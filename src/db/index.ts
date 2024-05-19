import mongoose from 'mongoose';
import model from './models';
import * as spotEnum from '../projects/spotAction/enum';
require('dotenv').config();

const { Project } = spotEnum;

mongoose.connect(process.env.MONGO_DB);

export const getModel = (label: string) => {
  switch (label) {
    case Project.SPOT_ACTION:
      return model.SpotAction;

    default:
      return null;
  }
};

// export default getModel;
