import GetMileageController from './getMileageController'
import GetMileageUseCase from './getMileageUseCase'
import ProductionRegisterRepository from '../../../repositories/implementations/ProductionRegisterRepository'
import EquipmentRepository from '../../../repositories/implementations/EquipmentRepository'

const productionRegister = new ProductionRegisterRepository()
const equipmentRepository = new EquipmentRepository()

const useCase = new GetMileageUseCase(productionRegister, equipmentRepository)

const controller = new GetMileageController(useCase)

export default controller
