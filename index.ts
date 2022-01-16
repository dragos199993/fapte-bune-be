import dotenv from 'dotenv'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { PrismaClient } from '@prisma/client'
import { context } from './graphql/context'
import { typeDefs } from './graphql/schema'
import { userResolvers } from './graphql/user/resolvers'

dotenv.config()
const app = express()
export const prismaClient = new PrismaClient()
const port = process.env.PORT || 4000

const resolvers = {
  Query: {
    ...userResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
  },
}

const server = new ApolloServer({ typeDefs, resolvers, context })

const bootstrap = async () => {
  try {
    await server.start()
    server.applyMiddleware({ app })
    app.listen({ port }, () =>
      console.log(
        `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
      )
    )
  } catch (_) {
    console.log(`Failed to start server`)
  }
}

bootstrap()
