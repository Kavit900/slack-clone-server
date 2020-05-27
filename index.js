import express from 'express';
import bodyParser from 'body-parser';
const { ApolloServer, gql } = require('apollo-server-express');
import { makeExecutableSchema } from 'graphql-tools';

import models from './models';

import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import cors from 'cors';

const app = express();

app.use(cors('*'));
 
const types = fileLoader(path.join(__dirname, './schema')); 

const typeDefs = mergeTypes(types);

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));


const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const server = new ApolloServer({ schema, context: 
  {
    models,
    user: {
      id: 1
    }
  } 
});

let pathGraphQl = '/graphql';

// app.use(pathGraphQl, bodyParser.json(), new ApolloServer({ schema, context: {
//   models,
// }
// }));


server.applyMiddleware({ app, pathGraphQl});

 models.sequelize.sync().then(() => {
  app.listen({ port: 8080 }, () =>
  console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`)
  )
});

