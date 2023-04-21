import client from '../../prismaClient/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                userName: userName,
              },
              {
                email: email,
              },
            ],
          },
        });
        if (existingUser) {
          throw new Error('username same');
        }
        const passwordHash = await bcrypt.hash(password, 5);
        return client.user.create({
          data: {
            firstName,
            lastName,
            userName,
            email,
            password: passwordHash,
          },
        });
      } catch (error) {
        return error;
      }
    },
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
    loginUser: async (_, { userName, password }) => {
      const user = await client.user.findFirst({ where: { userName } });
      if (!user) {
        return {
          ok: false,
          error: 'UserName not found',
        };
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return {
          ok: false,
          error: 'password wrong',
        };
      }
      const token = await jwt.sign({ id: user.id }, process.env.PRIVATE_KEY);
      console.log('token', token);
      return {
        ok: true,
        token,
        error: 'Not error',
      };
    },
  },
};
