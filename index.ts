import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()

const typeDefs = gql`
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
`

const resolvers = {
  Query: {
    users: () => prisma.user.findMany(),
  },
  Mutation: {
    createUser: (_: any, { name, email }: { name: string; email: string }) =>
      prisma.user.create({ data: { name, email } }),
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

server.start().then(() => {
  server.applyMiddleware({ app })
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  )
})
