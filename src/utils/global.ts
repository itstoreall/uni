import os from 'os';
import cron from 'node-cron';
import mongoose from 'mongoose';
import * as spotActionUtils from '../projects/spotAction/utils';
import * as projectConfig from '../projects/spotAction/config';
// import pricesCache, { CacheKey } from '../cache/prices';
// import fetchPrices from '../projects/spotAction/utils';
import * as spotActionEnum from '../projects/spotAction/enum';
import * as gc from '../config/global';
import * as gt from '../types/global';
import service from '../db/service';
import { getModel } from '../db';
require('dotenv').config();

const { Project, Action, Status } = spotActionEnum;

const corsOrigin = process.env.CORS_ORIGIN;
const { kaomoji, host } = gc.system;
const { SPOT_ACTION } = Project;
const dev = `${kaomoji} http://${host.local}`;
const prod = `http://${os.hostname()}`;
// const sec = '*/10 * * * * *'; // *
const min = '*/10 * * * *'; // *

// ------ is:

export const isLocal = () => os.hostname().split('.').pop() === 'local';

// ------ db:

export const dbCheck = (mongoose: any) => {
  const isConnected = mongoose.connection.readyState === 2;
  return { isConnected, db: isConnected ? 'mongodb' : 'no db' };
};

// ------ cors:

export const corsCheck = (origin: string) =>
  corsOrigin?.split(',').includes(origin);

// ------ App (Express):

export const initApp = (args: gt.ReqArgs) =>
  !corsCheck(args.req.headers.origin!)
    ? args.res.status(403).send(`uni ${kaomoji} server`)
    : args.next();

// ------ Server:

const SpotActionModel = getModel(SPOT_ACTION);

export const starter: gt.RunServer = async port => {
  spotActionUtils.fetchPrices();
  cron.schedule(min, spotActionUtils.fetchPrices);

  /*
  const params = { model: SpotActionModel };
  const actions = await service.getAll(params);
  console.log('all actions --->', actions);
  // */

  /*
  const params = { model: SpotActionModel, status: 'withdrawn' };
  const actions = await service.getByStatus(params);
  console.log('actions --->', actions);
  // */

  /*
  const params = { model: SpotActionModel, id: '66378383526c576e5564afd6' };
  const exists = await service.existsByID(params);
  console.log('exists --->', exists);
  // console.log('exists --->', exists._id.toString());
  // */

  /*
  const params = {
    model: SpotActionModel,
    input: {
      tokenId: 5,
      token: 'sol',
      action: Action.BUY,
      average_price: 15.5,
      current_price: 15.5,
      prices: [10, 21],
      percent: 8,
      status: Status.INVESTED
    }
  };
  const action = await service.create(params);
  console.log('action ->', action);
  // */

  /*
  const params = { model: SpotActionModel, id: '6649e97333421268d15351d2' };
  const daleted = (await service.removeByID(params)).deletedCount; // 0 or 1
  console.log('daleted ->', daleted);
  // */

  const dbName = dbCheck(mongoose).db;
  console.log('');
  console.log(`  uni ${isLocal() ? dev : prod}:${port} -> ${dbName} `);
  console.log('');
};
