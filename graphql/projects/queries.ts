import { Context } from '../context'

export const projects = (_: any, __: any, context: Context) =>
  context.prisma.project.findMany()
