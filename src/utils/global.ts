import os from 'os';
// import * as gc from '../config/global';
// import * as gt from '../types/global';

// const corsOrigin = process.env.CORS_ORIGIN;
// const { kaomoji } = gc.system;

// ------ is:

export const isLocal = () => os.hostname().split('.').pop() === 'local';

/*
// ------ cors:

export const corsCheck = (token: string) => {
  return corsOrigin?.split(',').includes(token);
};

// ------ App (Express):

export const initApp = (args: gt.ReqArgs) => {
  // !corsCheck(args.req.headers.origin!)
  //   ? args.res.status(403).send(`uni ${kaomoji} server (forbidden)`)
  //   : args.res.status(200).send(`uni ${kaomoji} server (available)`);
  return args.next();
};
*/
