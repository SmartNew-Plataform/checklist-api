import verifyUser from '@/middleware/verifyUser'
import { FastifyInstance } from 'fastify'
import getAllEquipmentByLogin from '@/useCases/equipment/getAllEquipmentByLogin'

export default async function equipmentRoutes(equipment: FastifyInstance) {
  equipment.addHook('onRequest', verifyUser)

  equipment.get('/byLogin', getAllEquipmentByLogin.handle)
}
