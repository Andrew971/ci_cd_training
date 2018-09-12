const { ApolloServer } = require('apollo-server-lambda');
const {typeDefs,resolvers} = require('./graphQL')

const graphQL = {
  typeDefs,
  resolvers
};
const server = new ApolloServer(graphQL);

exports.graphqlHandler = server.createHandler();