import os from 'os';
import { Server } from 'socket.io';

export type RunServer = (port: string, io: Server) => void;

// const { kaomoji } = gc.system;

export const isLocal = () => os.hostname().split('.').pop() === 'local';

// ------ Server:

const setHost = () =>
  isLocal() ? `${'★(◔.◔)★'} http://localhost` : `http://${os.hostname()}`;

export const runServer: RunServer = async (port, io) => {
  io.on('connection', async socket => console.log(1111111));
  const dbName = 'no db';
  console.log('');
  console.log(`  server ${setHost()}:${port} -> ${dbName} `);
  console.log('');
};
