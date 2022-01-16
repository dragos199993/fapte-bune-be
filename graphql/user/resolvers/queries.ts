import { Context } from '../../context'

export const users = (_: any, __: any, context: Context) =>
  context.prisma.user.findMany()

export const user = (_: any, { id }: { id: string }, context: Context) =>
  context.prisma.user.findUnique({
    where: { id: +id },
  })
