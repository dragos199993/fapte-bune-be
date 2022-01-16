import { Context } from '../context'

export const users = (_: any, __: any, context: Context) =>
  context.prisma.user.findMany({
    include: {
      projects: true,
      profile: true,
    },
  })

export const user = (_: any, { id }: { id: string }, context: Context) =>
  context.prisma.user.findUnique({
    include: {
      projects: true,
    },
    where: { id: +id },
  })
