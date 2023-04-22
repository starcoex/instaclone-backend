require('dotenv').config();
import { ApolloServer } from 'apollo-server';
import schema from './schema/schema';
import { getUser } from './schema/users/users.util';

const server = new ApolloServer({
  schema,
  context: async({ req }) => {
    console.log(req.headers)
    return {
      loggedInUser: await getUser(req.headers.token),   
    }  
  }
});
const PORT = process.env.PORT;

server
  .listen(PORT)
  .then(() =>
    console.log(`Server is running on http://localhost:${process.env.PORT}/`)
  );
