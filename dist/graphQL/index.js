"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = (0, apollo_server_express_1.gql) `
  type Query {
    hello: String
  }
`;
const resolvers = {
    Query: {
        hello: () => 'Hello world!'
    }
};
const runApolloServer = (app) => __awaiter(void 0, void 0, void 0, function* () {
    const apollo = new apollo_server_express_1.ApolloServer({ typeDefs, resolvers });
    const runApolloServer = (app) => apollo.applyMiddleware({ app, path: '/graphql' });
    try {
        yield apollo.start();
        runApolloServer(app);
        return true;
    }
    catch (e) {
        console.error('ERROR in runApolloServer:', e);
        return false;
    }
});
exports.default = runApolloServer;
//# sourceMappingURL=index.js.map