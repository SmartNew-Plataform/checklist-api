import getLocations from '@/useCases/locations/getLocation'
import { FastifyInstance } from 'fastify'

export default async function locationRoutes(app: FastifyInstance) {
  app.get('/', getLocations.handle)
}
