import getByLogin from '@/useCases/travels/getByLogin'
import getTravelById from '@/useCases/travels/getTravelById'
import putTravel from '@/useCases/travels/putTravel'
import { FastifyInstance } from 'fastify'

export default async function travelsRoutes(travels: FastifyInstance) {
  travels.get('/', getByLogin.handle)
  travels.get('/:id', getTravelById.handle)
  travels.put('/:id', putTravel.handle)
}
