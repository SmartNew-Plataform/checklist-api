import { FastifyInstance } from 'fastify'
import publicRoutes from './public'
import privateRoutes from './private'

export default async function routes(app: FastifyInstance) {
  app.register(publicRoutes, {
    prefix: 'public',
  })
  app.register(privateRoutes)
}
