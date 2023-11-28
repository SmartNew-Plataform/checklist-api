import getResponsibles from '@/useCases/responsibles/getResponsibles'
import { FastifyInstance } from 'fastify'

export default async function responsiblesRoutes(
  responsibles: FastifyInstance,
) {
  responsibles.get('/', getResponsibles.handle)
}
