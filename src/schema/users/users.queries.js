import client from '../../prismaClient/client';

export default {
  Query: {
    users: () => {
      return client.user.findMany();
    },
    seeProfile: (_, { userName }) => {
      return client.user.findUnique({ where: { userName } });
    },
  },
};
