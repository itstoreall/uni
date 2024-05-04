import ex from 'express';
import { createServer } from 'http';
import * as gt from './types/global';
import * as gu from './utils/global';
import * as gc from './config/global';
import routes from './routes';
import runApolloServer from './graphQL';
// import { connectSocket, createSocketServer } from './socket';
import { Server as SocketIOServer } from 'socket.io';

const { kaomoji } = gc.system;

const app: ex.Express = ex();
const port = process.env.PORT || 4001;

app.use((req, res, next) => gu.initApp({ req, res, next }));
app.use('/healthcheck', (_, res) => res.status(200).send(kaomoji));
app.use('/api', (_, __, next) => next(0), routes);

const server: gt.HttpServer = createServer(app);

runApolloServer(app);

const io = new SocketIOServer(server);

io.on('connection', socket => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// new SocketIOServer(server, {
//   allowRequest: (req, callback) => {
//     const isOriginValid = gu.corsCheck(req.headers.origin!);
//     callback(null, isOriginValid);
//   }
// });

// const io = createSocketServer(server);
// connectSocket(io);

server.listen({ port }, () => gu.starter(String(port), server, app));

app.use((e: Error, _: ex.Request, res: ex.Response, __: ex.NextFunction) => {
  const msg = e.message || 'Internal Server Error';
  return res.status(500).json({ error: msg });
});
