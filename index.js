import express from 'express';
import bodyParser from 'body-parser';
const { ApolloServer, gql } = require('apollo-server-express');
import { makeExecutableSchema } from 'graphql-tools';

import models from './models';

import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

const app = express();
 
const types = fileLoader(path.join(__dirname, './schema')); 

const typeDefs = mergeTypes(types);

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));


const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const server = new ApolloServer({ schema });

app.use(path, bodyParser.json());

let pathGraphQl = '/graphql';

server.applyMiddleware({ app, pathGraphQl });

 models.sequelize.sync({force: true}).then(() => {
  app.listen({ port: 8080 }, () =>
  console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`)
  )
});

