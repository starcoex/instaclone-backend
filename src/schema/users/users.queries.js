import client from '../../prismaClient/client';

export default {
  Query: {
    users: () => {
      return client.user.findMany();
    },
};
