import client from '../../prismaClient/client';

export default {
  Mutation: {
    updateUser: (_, { id, firstName, lastName, email }) => {
      return client.user.update({
        where: { id },
        data: {
          firstName,
          lastName,
          email,
        },
      });
    },
    deleteUser: (_, { userName }) => {
      return client.user.delete({ where: { userName } });
    },
  },
};
