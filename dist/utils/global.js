"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLocal = void 0;
const os_1 = __importDefault(require("os"));
// import * as gc from '../config/global';
// import * as gt from '../types/global';
// const corsOrigin = process.env.CORS_ORIGIN;
// const { kaomoji } = gc.system;
// ------ is:
const isLocal = () => os_1.default.hostname().split('.').pop() === 'local';
exports.isLocal = isLocal;
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
//# sourceMappingURL=global.js.map