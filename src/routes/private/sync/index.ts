import { FastifyInstance } from 'fastify'
import postSyncCheckList from '../../../useCases/sync/postSyncCheckList'
import postSyncCheckListPeriod from '../../../useCases/sync/postSyncCheckListPeriod'
import postSyncCheckListSchema from '../../../useCases/sync/postSyncCheckListSchema'

export default async function syncRoutes(sync: FastifyInstance) {
  sync.post('/checkList', postSyncCheckList.handle)
  sync.post('/checkListPeriod', postSyncCheckListPeriod.handle)
  sync.post('/checkListSchema', postSyncCheckListSchema.handle)
}
