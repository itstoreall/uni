import os from 'os';
import mongoose from 'mongoose';
import * as spotActionUtils from '../projects/spotAction/utils';
import * as gc from '../config/global';
import * as gt from '../types/global';
import cron from '../utils/cron';
require('dotenv').config();

const corsOrigin = process.env.CORS_ORIGIN;
const { kaomoji, host } = gc.system;
const dev = `${kaomoji} http://${host.local}`;
const prod = `http://${os.hostname()}`;
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

export const initApp = (args: gt.ReqArgs) => {
  console.log('args.req ----->', args.req);
  return !corsCheck(args.req.headers.origin!)
    ? args.next() // args.res.status(403).send(`uni ${kaomoji} server`)
    : args.next();
};

// ------ Server:

export const starter: gt.RunServer = async port => {
  spotActionUtils.cronFn();
  cron(min, spotActionUtils.cronFn);
  const dbName = dbCheck(mongoose).db;
  console.log('');
  console.log(`  uni ${isLocal() ? dev : prod}:${port} -> ${dbName} `);
  console.log('');
};
