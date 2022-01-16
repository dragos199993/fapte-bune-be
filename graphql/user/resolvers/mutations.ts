import { Context } from '../../context'

export const createUser = (
  _: any,
  { password, email }: { password: string; email: string },
  context: Context
) => context.prisma.user.create({ data: { email, password } })

export const updateUser = (
  _: any,
  { id, email }: { id: string; email: string },
  context: Context
) =>
  context.prisma.user.update({
    where: { id: +id },
    data: { email },
  })

export const deleteUser = (_: any, { id }: { id: string }, context: Context) =>
  context.prisma.user.delete({ where: { id: +id } })
