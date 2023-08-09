import { FastifyInstance } from 'fastify'
import putCheckListPeriod from '../../../useCases/checkListPeriod/putCheckListPeriod'

export default async function checkListPeriodRoutes(
  checkListPeriod: FastifyInstance,
) {
  checkListPeriod.put('/', putCheckListPeriod.handle)
}
