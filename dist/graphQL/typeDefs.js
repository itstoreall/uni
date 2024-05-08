"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = (0, apollo_server_express_1.gql) `
  type Query {
    hello: String
  }

  """
  enums:
  """
  enum EAction {
    buy
    sell
  }

  enum EStatus {
    invested
    withdrawn
  }

  type Action {
    id: ID
    tokenId: Int
    token: String
    action: EAction
    average_price: Float
    prices: [Float]
    status: EStatus
  }

  input ActionInput {
    tokenId: Int!
    token: String!
    action: EAction!
    average_price: Float
    prices: [Float]
    status: EStatus!
  }

  type Query {
    getUser(id: ID!): String
    getActions: [Action]
  }

  type Mutation {
    createAction(input: ActionInput!): Action
  }
`;
//# sourceMappingURL=typeDefs.js.map