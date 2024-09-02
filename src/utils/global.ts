import os from 'os';
import * as gc from '../config/global';
import * as gt from '../types/global';

const corsOrigin = process.env.CORS_ORIGIN;
const { kaomoji } = gc.system;

// ------ is:

export const isLocal = () => os.hostname().split('.').pop() === 'local';

// ------ cors:

export const corsCheck = (token: string) => {
  console.log('token ==>', token);
  return corsOrigin?.split(',').includes(token);
};

// ------ App (Express):

export const initApp = (args: gt.ReqArgs) => {
  console.log('args.req.headers ==>', args.req.headers);
  const { origin, authorization } = args.req.headers;
  return !corsCheck(origin ?? authorization.split('Bearer ')[1])
    ? args.res.status(403).send(`uni ${kaomoji} server`)
    : args.next();
};
