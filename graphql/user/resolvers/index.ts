import { createUser, deleteUser, updateUser } from './mutations'
import { user, users } from './queries'

export const userResolvers = {
  Query: {
    users,
    user,
  },
  Mutation: {
    createUser,
    updateUser,
    deleteUser,
  },
}
