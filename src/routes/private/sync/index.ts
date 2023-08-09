import { FastifyInstance } from 'fastify'
import postSyncCheckList from '../../../useCases/sync/postSyncCheckList'

export default async function syncRoutes(sync: FastifyInstance) {
  sync.post('/checkList', postSyncCheckList.handle)
}
