import { FastifyInstance } from 'fastify'
import branchRoutes from './branch'
import checkListRoutes from './checkList'
import equipmentRoutes from './equipment'
import loginRoutes from './login'

export default async function publicRoutes(app: FastifyInstance) {
  app.register(loginRoutes, {
    prefix: '/login',
  })

  app.register(branchRoutes, {
    prefix: '/branch',
  })

  app.register(equipmentRoutes, {
    prefix: '/equipment',
  })

  app.register(checkListRoutes, {
    prefix: '/checkList',
  })
}
