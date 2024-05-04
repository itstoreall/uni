import os from 'os';
import * as gc from '../config/global';
import * as gt from '../types/global';
require('dotenv').config();

const corsOrigin = process.env.CORS_ORIGIN;
const { kaomoji, host } = gc.system;
const dev = `${kaomoji} http://${host.local}`;
const prod = `http://${os.hostname()}`;

export const isLocal = () => os.hostname().split('.').pop() === 'local';

export const corsCheck = (origin: string) => String(origin) === corsOrigin;

// ------ App (Express):

export const initApp = (args: gt.ReqArgs) =>
  !corsCheck(args.req.headers.origin!)
    ? args.res.status(403).send('CORS!')
    : args.next();

// ------ Server:

export const starter: gt.RunServer = async (port, server, app) => {
  const dbName = 'no db';
  console.log('');
  console.log(`  server ${isLocal() ? dev : prod}:${port} -> ${dbName} `);
  console.log('');
};
