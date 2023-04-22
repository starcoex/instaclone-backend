require('dotenv').config();
import { ApolloServer } from 'apollo-server';
import schema from './schema/schema';
import { getUser, protectResolver } from './schema/users/users.util';

const server = new ApolloServer({
  schema,
  context: async({ req }) => {
    console.log(req.headers)
    return {
      loggedInUser: await getUser(req.headers.token),
      // protectResolver: protectResolver(loggedInUser),
      protectResolver
    }
    // return {
    //   token:req.headers.token
    // }
  }
  // context: {
  //   token:
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNjgyMDc4MDQ5fQ.LmhL-BNVxENR_DALLuTJEbl3ZHyzFtCGpSzSvcyR6ME',
  // },
});
const PORT = process.env.PORT;

server
  .listen(PORT)
  .then(() =>
    console.log(`Server is running on http://localhost:${process.env.PORT}/`)
  );
