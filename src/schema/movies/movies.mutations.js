import client from '../../prismaClient/client';

export default {
  Mutation: {
    createMovie: (_, { title, yea, genre }) => {
      console.log(title, genre);
      return client.movie.create({
        data: { title, year: yea, genre: genre },
      });
    },
    deleteMovie: (_, { id }) => {
      return client.movie.delete({ where: { id: id } });
    },
    updateMovie: (_, { id, year }) => {
      return client.movie.update({
        where: { id: id },
        data: { year: year },
      });
    },
  },
}