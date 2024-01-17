import EquipmentRepository from '@/repositories/implementations/EquipmentRepository'
import PutEquipmentController from './putEquipmentController'
import PutEquipmentUseCase from './putEquipmentUseCase'

const equipmentRepository = new EquipmentRepository()

const useCase = new PutEquipmentUseCase(equipmentRepository)
const controller = new PutEquipmentController(useCase)

export default controller
