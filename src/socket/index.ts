import { Server as SocketIOServer } from 'socket.io';
import * as gu from '../utils/global';
import { SocketServer } from './types';
import { HttpServer } from '../types/global';

export const createSocketServer = (server: HttpServer) => {
  return new SocketIOServer(server, {
    allowRequest: (req, callback) => {
      const isOriginValid = gu.corsCheck(req.headers.origin!);
      callback(null, isOriginValid);
    }
  });
};

export const connectSocket = (io: SocketServer) =>
  io.on('connection', async socket => console.log(1111111));
