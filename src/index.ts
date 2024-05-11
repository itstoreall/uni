import { ApolloServer } from 'apollo-server-express';
import ex from 'express';
import { createServer } from 'http';
import * as gt from './types/global';
import * as gu from './utils/global';
import gGql from './graphQL/global';
import routes from './routes';

const app: ex.Express = ex();
const port = process.env.PORT || 4001;

app.use((req, res, next) => gu.initApp({ req, res, next }));
app.use('/api', (_, __, next) => next(0), routes);

const server: gt.HttpServer = createServer(app);
const apollo = new ApolloServer({ ...gGql });

apollo.start().then(() => apollo.applyMiddleware({ app, path: '/graphql' }));
server.listen({ port }, () => gu.starter(String(port)));

app.use((e: Error, _: ex.Request, res: ex.Response, __: ex.NextFunction) => {
  const msg = e.message || 'Internal Server Error';
  return res.status(500).json({ error: msg });
});
