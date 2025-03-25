import { FastifyInstance } from 'fastify'
import getProvider from '@/useCases/provider/getProvider'

export default async function providerRoutes(provider: FastifyInstance) {
  provider.get('/', getProvider.handle)
}
