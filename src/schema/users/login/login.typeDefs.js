import { gql } from 'apollo-server';

export default gql`
  type LoginResult {
    ok: Boolean!
    error: String
    token: String
  }
  type Mutation {
    loginUser(userName: String!, password: String!): LoginResult!
  }
`;