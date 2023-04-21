import client from '../../../prismaClient/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default {
  Mutation: {
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
        error: 'Not errors',
      };
    }
  },
};