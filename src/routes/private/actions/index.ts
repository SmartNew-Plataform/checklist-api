import getActionById from '@/useCases/actions/getActionById'
import getActionGroupById from '@/useCases/actions/getActionGroupById'
import getByClient from '@/useCases/actions/getByClient'
import postAction from '@/useCases/actions/postAction'
import postActionImage from '@/useCases/actions/postActionImage'
import putAction from '@/useCases/actions/putAction'
import { FastifyInstance } from 'fastify'

export default async function actionsRoutes(actions: FastifyInstance) {
  actions.get('/', getByClient.handle)
  actions.post('/', postAction.handle)
  actions.put('/:id', putAction.handle)
  actions.get('/:id', getActionById.handle)
  actions.get('/groupById/:id', getActionGroupById.handle)
  actions.post('/image/upload/:actionGroupId', postActionImage.handle)
}
