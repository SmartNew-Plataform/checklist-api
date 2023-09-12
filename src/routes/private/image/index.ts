import postImage from '@/useCases/image/postImage'
import { FastifyInstance } from 'fastify'

export default async function imageRoutes(image: FastifyInstance) {
  image.post('/upload/:checkListPeriodId', postImage.handle)
}
