import { ApolloServer } from 'apollo-server-express';
import ex from 'express';
import { createServer } from 'http';
import starter from './utils/starter';
import * as gt from './types/global';
import * as gu from './utils/global';
import gGql from './graphQL/global';
import routes from './routes';
import w from './winston';

const app: ex.Express = ex();
const port = process.env.PORT || 4001;

app.use((_, __, next) => next(0));
app.use('/api', (_, __, next) => next(0), routes);

const server: gt.HttpServer = createServer(app);
const apollo = new ApolloServer({ ...gGql });

const startApolloServer = async () => {
  try {
    await apollo.start();
    apollo.applyMiddleware({ app, path: '/graphql' });
    server.listen({ port }, () => starter(String(port)));
  } catch (e) {
    w.err(`ERRIR in startApolloServer: ${e}`);
  }
};

startApolloServer();

// ---

app.use((e: Error, _: ex.Request, res: ex.Response, __: ex.NextFunction) => {
  w.err(`ERROR: ${e}`);
  const msg = e.message || 'Internal Server Error';
  return res.status(500).json({ error: msg });
});

process.on('unhandledRejection', (reason, promise) => {
  w.err(`Unhandled Rejection at: ${promise} reason: ${reason}`);
});

process.on('uncaughtException', e => {
  w.err(`Uncaught Exception: ${e}`);
});
