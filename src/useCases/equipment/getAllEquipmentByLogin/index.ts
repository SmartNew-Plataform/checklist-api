import EquipmentRepository from '@/repositories/implementations/EquipmentRepository'
import GetAllEquipmentByLoginUseCase from './getAllEquipmentByLoginUseCase'
import GetAllEquipmentByLoginController from './getAllEquipmentByLoginController'

const equipmentRepository = new EquipmentRepository()

const useCase = new GetAllEquipmentByLoginUseCase(equipmentRepository)

const controller = new GetAllEquipmentByLoginController(useCase)

export default controller
