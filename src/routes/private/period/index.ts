import { FastifyInstance } from 'fastify'
import getPeriod from '../../../useCases/period/getPeriod'
import getPeriodByBranch from '../../../useCases/period/getPeriodByBranch'

export default async function periodRoutes(period: FastifyInstance) {
  period.get('/byClient', getPeriod.handle)
  period.get('/byBranch', getPeriodByBranch.handle)
}
