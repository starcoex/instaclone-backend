import client from '../../../prismaClient/client';

export default {
  Query: {
    seeProfile: (_, { userName }) => {
      return client.user.findUnique({ where: { userName } });
    },
  },
}
