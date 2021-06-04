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
    getUser(id: Int): User
  }
  input UserInput {
    username: String
  }
  type Mutation {
    createUser(user: UserInput): User
    deleteUser(id: Int): String
    updateUser(id: Int, user: UserInput): User
  }
`;
export { typeDefs };
