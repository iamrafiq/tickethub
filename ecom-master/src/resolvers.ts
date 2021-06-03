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
  },
};

export { resolvers };
