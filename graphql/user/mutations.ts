import { Maybe } from 'graphql/jsutils/Maybe'
import {
  MutationCreateUserArgs,
  MutationDeleteUserArgs,
  MutationUpdateUserArgs,
  ResolversTypes,
} from '../generated/graphql'
import { Context } from '../context'

export const createUser = (
  _: Maybe<ResolversTypes['User']>,
  { password, email }: MutationCreateUserArgs,
  context: Context
) => context.prisma.user.create({ data: { email, password } })

export const updateUser = (
  _: Maybe<ResolversTypes['User']>,
  { id, email }: MutationUpdateUserArgs,
  context: Context
) =>
  context.prisma.user.update({
    where: { id: +id },
    data: { email: email as string },
  })

export const deleteUser = (
  _: Maybe<ResolversTypes['User']>,
  { id }: MutationDeleteUserArgs,
  context: Context
) => context.prisma.user.delete({ where: { id: +id } })
