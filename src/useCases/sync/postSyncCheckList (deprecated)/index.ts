import CheckListPeriodRepository from '../../../repositories/implementations/CheckListPeriodRepository'
import EquipmentRepository from '../../../repositories/implementations/EquipmentRepository'
import ProductionRegisterRepository from '../../../repositories/implementations/ProductionRegisterRepository'
import PostSyncCheckListUseCase from './postSyncCheckListUseCase'
import PostSyncCheckListController from './postSyncCheckListController'

const productionRegisterRepository = new ProductionRegisterRepository()
const equipmentRepository = new EquipmentRepository()
const checkListPeriodRepository = new CheckListPeriodRepository()

const useCase = new PostSyncCheckListUseCase(
  productionRegisterRepository,
  equipmentRepository,
  checkListPeriodRepository,
)

const controller = new PostSyncCheckListController(useCase)

export default controller
