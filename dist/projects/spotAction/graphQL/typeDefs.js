"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = (0, apollo_server_express_1.gql) `
  type Query {
    hello: String
  }

  """
  Enums
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
    current_price: Float
    prices: [Float]
    percent: Float
    status: EStatus
  }

  """
  Inputs
  """
  input ActionInput {
    tokenId: Int!
    token: String!
    action: EAction!
    average_price: Float
    current_price: Float
    prices: [Float]
    percent: Float
    status: EStatus!
  }

  type Query {
    getUser(id: ID!): String
    getActions: [Action]
  }

  type Mutation {
    addAction(input: ActionInput!): Action
  }
`;
exports.default = typeDefs;
//# sourceMappingURL=typeDefs.js.map