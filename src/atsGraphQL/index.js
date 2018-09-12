import { ApolloServer } from 'apollo-server-lambda';
import {typeDefs,resolvers} from './graphQL';
//testing my graphQl
const graphQL = {
  typeDefs,
  resolvers
};
const server = new ApolloServer(graphQL);

exports.graphqlHandler = server.createHandler();