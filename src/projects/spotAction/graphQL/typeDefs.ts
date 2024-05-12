import { gql } from 'apollo-server-express';

const typeDefs = gql`
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
    getActionByID(id: ID!): Action
  }

  type Mutation {
    addAction(input: ActionInput!): Action
  }
`;

export default typeDefs;
