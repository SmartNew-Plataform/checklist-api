import { FastifyInstance } from 'fastify'
import getProductionDiverse from '../../../useCases/productionDiverse/getProductionDiverse'

export default async function productionDiverseRoutes(
  productionDiverse: FastifyInstance,
) {
  productionDiverse.get('/', getProductionDiverse.handle)
}
