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
  type Query {
    users: [User]
  }
  type Mutation {
    updateUser(
      id: Int
      firstName: String
      lastName: String
      email: String
    ): User
    deleteUser(userName: String): User
  }
`;
