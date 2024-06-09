import os from 'os';
import mongoose from 'mongoose';
import * as spotActionUtils from '../projects/spotAction/utils';
import * as gc from '../config/global';
import * as gt from '../types/global';
import * as gu from './global';

const { kaomoji, host } = gc.system;
const dev = `${kaomoji} http://${host.local}`;
const prod = `http://${os.hostname()}`;

// ------ db:

const dbCheck = (mongoose: any) => {
  const isConnected = mongoose.connection.readyState === 2;
  return { isConnected, db: isConnected ? 'mongodb' : 'no db' };
};

// ------ Server:

const starter: gt.RunServer = async port => {
  console.log('* starter');
  spotActionUtils.updateActions();
  const dbName = dbCheck(mongoose).db;
  console.log('');
  console.log(`  uni ${gu.isLocal() ? dev : prod}:${port} -> ${dbName} `);
  console.log('');
};

export default starter;
