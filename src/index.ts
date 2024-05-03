import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { runServer } from './utils/global';
// import * as gc from './configs/global';
import routes from './routes';

// const { kaomoji } = gc.system;

const app = express();
const port = process.env.PORT || 4001;
const corsOrigin = process.env.CORS_ORIGIN || '*';
const corsOptions = { origin: corsOrigin?.split(',') };
const server = createServer(app);
const io = new Server(server, { cors: corsOptions });

app.use(cors());
app.use(express.json());
app.use('/healthcheck', (_, res) => res.status(200).send('I`m fine!'));
app.use('/api', (_, __, next) => next(0), routes);

server.listen(port, () => runServer(String(port), io));

app.use((_, res) => res.status(404).json({ error: `Not found` }));
app.use((e: Error, _: Request, res: Response, __: NextFunction) => {
  const msg = e.message || 'Internal Server Error';
  return res.status(500).json({ error: msg });
});
