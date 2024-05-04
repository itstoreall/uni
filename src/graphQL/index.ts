import { ApolloServer, gql } from 'apollo-server-express';
import { Express } from 'express';

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  }
};

const runApolloServer = async (app: Express) => {
  const apollo = new ApolloServer({ typeDefs, resolvers });

  const runApolloServer = (app: any) =>
    apollo.applyMiddleware({ app, path: '/graphql' });

  try {
    await apollo.start();
    runApolloServer(app);
    return true;
  } catch (e) {
    console.error('ERROR in runApolloServer:', e);
    return false;
  }
};

export default runApolloServer;
