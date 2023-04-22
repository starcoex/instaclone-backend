import client from '../../../prismaClient/client';
import bcrypt from 'bcrypt';
import { protectResolver } from '../users.util';

const resolverFn = async (
  _,
  { firstName, lastName, userName, email, password },
  { loggedInUser, protectResolver }
) => {
  let passwordHash = null;
  if (password) {
    passwordHash = await bcrypt.hash(password, 5);
  }
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
};

export default {
  Mutation: {
    editProfile: protectResolver(resolverFn),
  },
};
