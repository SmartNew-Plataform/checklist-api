import getByClient from '@/useCases/actions/getByClient'
import postActionImage from '@/useCases/actions/postActionImage'
import { FastifyInstance } from 'fastify'

export default async function actionsRoutes(actions: FastifyInstance) {
  actions.get('/', getByClient.handle)
  actions.post('/image/upload/:actionGroupId', postActionImage.handle)
}
