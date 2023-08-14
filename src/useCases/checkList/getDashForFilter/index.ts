import CheckListStatusRepository from '@/repositories/implementations/CheckListStatusRepository'
import EquipmentRepository from '@/repositories/implementations/EquipmentRepository'
import GetDashForFilterUseCase from './getDashForFilterUseCase'
import GetDashForFilterController from './getDashForFilterController'
import ProductionRegisterRepository from '@/repositories/implementations/ProductionRegisterRepository'

const checkListStatusRepository = new CheckListStatusRepository()
const equipmentRepository = new EquipmentRepository()
const productionRegisterRepository = new ProductionRegisterRepository()

const useCase = new GetDashForFilterUseCase(
  checkListStatusRepository,
  equipmentRepository,
  productionRegisterRepository,
)

const controller = new GetDashForFilterController(useCase)

export default controller
