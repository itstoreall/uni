import os from 'os';
import mongoose from 'mongoose';
// import * as projectConfig from '../projects/spotAction/config';
import * as gc from '../config/global';
import * as gt from '../types/global';
// import * as ge from '../enum/global';
// import service from '../db/service';
// import getModel from '../db';
require('dotenv').config();

const corsOrigin = process.env.CORS_ORIGIN;
const { kaomoji, host } = gc.system;
// const { SPOT_ACTION } = ge.Project;
const dev = `${kaomoji} http://${host.local}`;
const prod = `http://${os.hostname()}`;

export const isLocal = () => os.hostname().split('.').pop() === 'local';

export const dbCheck = (mongoose: any) => {
  const isConnected = mongoose.connection.readyState === 2;
  return { isConnected, db: isConnected ? 'mongodb' : 'no db' };
};

export const corsCheck = (origin: string) =>
  corsOrigin?.split(',').includes(origin);

// ------ App (Express):

export const initApp = (args: gt.ReqArgs) =>
  !corsCheck(args.req.headers.origin!)
    ? args.res.status(403).send(`uni ${kaomoji} server`)
    : args.next();

// ------ Server:

// const SpotActionModel = getModel(SPOT_ACTION);

export const starter: gt.RunServer = async port => {
  /*
  const actions = await service.getAll(SpotActionModel);
  console.log('actions --->', actions?.length);
  // */

  /*
  const action = await service.create(SpotActionModel, {
    tokenId: 4,
    token: 'avax',
    action: projectConfig.spotAction.action.BUY,
    average_price: 15.5,
    prices: [10, 21],
    status: projectConfig.spotAction.status.INVESTED
  });
  console.log('action ->', action);
  // */

  const dbName = dbCheck(mongoose).db;
  console.log('');
  console.log(`  uni ${isLocal() ? dev : prod}:${port} -> ${dbName} `);
  console.log('');
};
