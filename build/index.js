"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const client_1 = require("@prisma/client");
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const port = process.env.PORT || 4000;
const typeDefs = (0, apollo_server_express_1.gql) `
  type User {
    id: ID!
    name: String!
    email: String!
  }
  type Query {
    users: [User]
  }

  type Mutation {
    createUser(name: String!, email: String!): User
  }
`;
const resolvers = {
    Query: {
        users: () => prisma.user.findMany(),
    },
    Mutation: {
        createUser: (_, { name, email }) => prisma.user.create({ data: { name, email } }),
    },
};
const server = new apollo_server_express_1.ApolloServer({ typeDefs, resolvers });
const bootstrap = async () => {
    try {
        await server.start();
        server.applyMiddleware({ app });
        app.listen({ port }, () => console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`));
    }
    catch (_) {
        console.log(`Failed to start server`);
    }
};
bootstrap();
