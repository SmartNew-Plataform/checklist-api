import ProductionRegisterDataRepository from '../../../repositories/implementations/ProductionRegisterDataRepository'
import GetHourMeterAndMileageController from './getHourMeterAndMileageController'
import GetHourMeterAndMileageUseCase from './getHourMeterAndMileageUseCase'
import ProductionRegisterRepository from '../../../repositories/implementations/ProductionRegisterRepository'
import EquipmentRepository from '../../../repositories/implementations/EquipmentRepository'

const productionRegisterData = new ProductionRegisterDataRepository()
const productionRegister = new ProductionRegisterRepository()
const equipmentRepository = new EquipmentRepository()

const useCase = new GetHourMeterAndMileageUseCase(
  productionRegisterData,
  productionRegister,
  equipmentRepository,
)

const controller = new GetHourMeterAndMileageController(useCase)

export default controller
