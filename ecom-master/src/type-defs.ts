import { gql } from 'apollo-server-express';
const typeDefs = gql`
  type User {
    id: Int
    username: String
    posts: [Post]
  }
  type Post {
    id: Int
    title: String
    post: String
  }
  type Query {
    hello: String
    getAllUser: [User]
  }
`;
export { typeDefs };
