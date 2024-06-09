"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = (0, apollo_server_express_1.gql) `
  enum EAction {
    init
    buy
    sell
  }

  enum EStatus {
    init
    invested
    withdrawn
  }

  """
  Types
  """
  type Action {
    id: ID!
    tokenId: Int!
    token: String!
    action: EAction!
    average_price: Float!
    current_price: Float!
    prices: [Float]!
    percent: Float!
    status: EStatus!
  }

  type ActionsRes {
    isUpdated: Boolean!
    actions: [Action]!
  }

  """
  Inputs
  """
  input ActionInput {
    tokenId: Int!
    token: String!
    action: EAction!
    average_price: Float!
    current_price: Float!
    prices: [Float]!
    percent: Float!
    status: EStatus!
  }

  """
  Queries
  """
  type Query {
    getUser(id: ID!): String
    getActions: ActionsRes!
    getActionByID(id: ID!): Action!
  }

  type Mutation {
    addAction(input: ActionInput!): Action!
  }
`;
exports.default = typeDefs;
//# sourceMappingURL=typeDefs.js.map