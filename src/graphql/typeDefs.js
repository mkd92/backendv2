import { gql } from "apollo-server-express";

const typeDefs = gql`
  type user {
    _id: ID
    name: String
    username: String
  }
  type Query {
    hello: user
  }
`;

export default typeDefs;
