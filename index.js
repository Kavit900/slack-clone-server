import express from 'express';
import bodyParser from 'body-parser';
const { ApolloServer, gql } = require('apollo-server-express');
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './schema';
import resolvers from './resolvers';
import models from './models';

const app = express();
const path = '/graphql';

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const server = new ApolloServer({ schema });

app.use(path, bodyParser.json());

server.applyMiddleware({ app, path });

 models.sequelize.sync().then(() => {
  app.listen({ port: 8080 }, () =>
  console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`)
  )
});

