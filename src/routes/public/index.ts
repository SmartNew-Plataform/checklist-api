import { FastifyInstance } from 'fastify'
import loginRoutes from './login'
import branchRoutes from './branch'
import equipmentRoutes from './equipment'

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
}
