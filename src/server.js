import { PrismaClient } from '@prisma/client';
import { gql, ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

const prismaClient = new PrismaClient();

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
const resolvers = {
  Query: {
    movies: () => prismaClient.movie.findMany(),
    movie: (_, { id }) => prismaClient.movie.findUnique({ where: { id: id } }),
  },

  Mutation: {
    createMovie: (_, { title, yea, genre }) => {
      console.log(title, genre);
      return prismaClient.movie.create({
        data: { title, year: yea, genre: genre },
      });
    },
    deleteMovie: (_, { id }) => {
      return prismaClient.movie.delete({ where: { id: id } });
    },
    updateMovie: (_, { id, year }) => {
      return prismaClient.movie.update({
        where: { id: id },
        data: { year: year },
      });
    },
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

// console.log(server);

server
  .listen()
  .then(() => console.log('Server is running on http://localhost:4000/'));
