import client from '../../prismaClient/client';

export default {
  Query: {
    movies: () => client.movie.findMany(),
    movie: (_, { id }) => client.movie.findUnique({ where: { id: id } }), 
  },
};