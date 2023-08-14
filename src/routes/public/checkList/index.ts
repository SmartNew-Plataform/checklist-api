import verifyUser from '@/middleware/verifyUser'
import { FastifyInstance } from 'fastify'

import getDashForFilter from '@/useCases/checkList/getDashForFilter'

export default async function checkListRoutes(checkList: FastifyInstance) {
  checkList.addHook('onRequest', verifyUser)

  checkList.get('/dashForFilter', getDashForFilter.handle)
}
