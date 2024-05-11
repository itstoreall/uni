import { gql } from 'apollo-server-express';

export const typeDefs = gql`
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
    prices: [Float]
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
