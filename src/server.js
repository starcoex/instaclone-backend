require('dotenv').config();
import { ApolloServer } from 'apollo-server';
import schema from './schema/schema';

const server = new ApolloServer({ schema });
const PORT = process.env.PORT;

server
  .listen(PORT)
  .then(() =>
    console.log(`Server is running on http://localhost:${process.env.PORT}/`)
  );
