import client from '../../../prismaClient/client';
import bcrypt from 'bcrypt';


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
  }
}