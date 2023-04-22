import client from '../../../prismaClient/client';
import bcrypt from 'bcrypt';

export default {
  Mutation: {
    editProfile: async (
      _,
      { firstName, lastName, userName, email, password },
      { loggedInUser, protectResolver }
    ) => {
      // if (!loggedInUser) {
      //   throw new Error('You need to login');
      // }
      protectResolver(loggedInUser);
      console.log(firstName, lastName, userName, email, password, loggedInUser);
      // const { id } = jwt.verify(token, process.env.PRIVATE_KEY);
      // console.log('token', id);
      let passwordHash = null;
      if (password) {
        passwordHash = await bcrypt.hash(password, 5);
      }
      // const passwordHash = await bcrypt.hash(password, 5);

      const updateUser = await client.user.update({
        where: { id: loggedInUser.id },
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
