import { PrismaClient } from '@prisma/client';
const { user, post } = new PrismaClient();

const resolvers = {
  Query: {
    hello: () => {
      return 'hello world';
    },
    getAllUser: async () => {
      return await user.findMany({
        select: {
          username: true,
          posts: true,
        },
      });
    },
    getUser: async (parent: any, args: any, context: any, info: any) => {
      const { id } = args;
      console.log('id----->', id);
      return await user.findUnique({
        where: {
          id: id,
        },
      });
    },
  },
  Mutation: {
    createUser: {
      resolve: async (parent: any, args: any, context: any, info: any) => {
        const { username } = args.user;
        const userExists = await user.findUnique({
          where: {
            username,
          },
          select: {
            username: true,
          },
        });
        if (userExists) {
          return { msg: 'User already exists' };
        }

        const newUser = await user.create({
          data: {
            username,
          },
        });

        return newUser;
      },
    },
  },
};

export { resolvers };
