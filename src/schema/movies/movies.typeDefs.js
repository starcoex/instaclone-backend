import { gql } from 'apollo-server';

const typeDefs = gql`
  type Movie {
    id: Int!
    title: String!
    year: Int!
    genre: String
    createAt: String!
    updateAt: String!
  }
  # type Query {
  #   hello: String
  # }
  type Query {
    movies: [Movie]
    movie(id: Int): Movie
  }
  type Mutation {
    createMovie(title: String, yea: Int, genre: String): Movie
    deleteMovie(id: Int): Movie
    updateMovie(id: Int, year: Int): Movie
  }
`;

export default typeDefs