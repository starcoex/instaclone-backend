import jwt from 'jsonwebtoken';
import client from '../../prismaClient/client';

export const getUser = async (token) => {
  try {
    if (!token) {
    return null
  }
    const { id } = await jwt.verify(token, process.env.PRIVATE_KEY);
    const user = await client.user.findUnique({ where: { id: id } });
    if (user) {
      return user;
    } else {
      return null
    }
} catch  {
  return null
}
}

// export const protectResolver = (user) => {
//   if (!user) {
//     throw new Error('You need to login');
//   }
// }
export const protectResolver = (outResolver) => (root, args, context, info) => {
  if (!context.loggedInUser) {
    return {
      ok: false,
      error:"Please log in to perform this action"
    }
  }
  return outResolver(root, args, context, info)
}