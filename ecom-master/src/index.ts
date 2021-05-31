// import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';
import { postgresWrapper } from './postgres-wrapper';
// import { Sequelize } from 'sequelize';
// postgresql://postgres:root@postgres-srv.default.svc.cluster.local:5432/postgresdb?schema=public"
// const sequelize = new Sequelize(process.env.DATABASE_URL!);
// console.log('users', users);
// async function main() {}

// main()
//   .catch((e) => {
//     throw e;
//   })

//   .finally(async () => {
//     await prisma.$disconnect();
//   });

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
    // await mongoose.connect(process.env.MONGO_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    // });
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!');
  });
};

start();
