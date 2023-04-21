import client from '../../../prismaClient/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default {
  Mutation: {
    editProfile: async (
      _,
      { firstName, lastName, userName, email, password, token }
    ) => {
      console.log(firstName, lastName, userName, email, password, token);
      const { id } = jwt.verify(token, process.env.PRIVATE_KEY);
      console.log('token', id);
      let passwordHash = null;
      if (password) {
        passwordHash = await bcrypt.hash(password, 5);
      }
      // const passwordHash = await bcrypt.hash(password, 5);

      const updateUser = await client.user.update({
        where: { id: id },
        data: {
          firstName,
          lastName,
          userName,
          email,
          // password: passwordHash,
          ...(passwordHash && { password: passwordHash }),
        },
      });
      if (updateUser.id) {
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: 'not update',
        };
      }
    },
  },
};
