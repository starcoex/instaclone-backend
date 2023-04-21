import { gql } from 'apollo-server';

export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String
    userName: String!
    email: String!
    password: String!
    createdAt: String!
    updatedAt: String!
  }
  type LoginResult {
    ok: Boolean!
    error: String
    token: String
  }

  type Query {
    users: [User]
    seeProfile(userName: String!): User
  }
  type Mutation {
    createAccount(
      firstName: String!
      lastName: String
      userName: String!
      email: String!
      password: String!
    ): User
    updateUser(
      id: Int
      firstName: String
      lastName: String
      email: String
    ): User
    deleteUser(userName: String): User
    loginUser(userName: String!, password: String!): LoginResult!
  }
`;
