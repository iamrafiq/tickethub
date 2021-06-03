// import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';
import { postgresWrapper } from './postgres-wrapper';
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return 'hello world';
    },
  },
};

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  // if (!process.env.MONGO_URI) {
  //   throw new Error('MONGO_URI must be defined');
  // }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be defined');
  }
  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined');
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined');
  }
  try {
    /**
     * clusterId: ticketing: is cluster id (-cid) from nats-depl.yaml file
     * clientId: random string
     * url: service from nats-depl file
     */
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    console.log('Ecom -master Live');
    // @ts-ignore
    postgresWrapper.sequelize
      .authenticate()
      .then(() => {
        console.log(
          'Postgres DB connection has been established successfully.'
        );
      })
      .catch((error: any) =>
        console.error('Unable to connect to the database:', error)
      );

    const apolllowServer = new ApolloServer({ typeDefs, resolvers });
    await apolllowServer.start();
    apolllowServer.applyMiddleware({ app: app });
    // app.use((req: Request, res: Response) => {
    //   res.send('Hello express server');
    // });
    // app.listen(3000, () => console.log('Our server is running on port 3000'));
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!');
  });
};

start();
