import EquipmentRepository from '../../../repositories/implementations/EquipmentRepository'
import PeriodRepository from '../../../repositories/implementations/PeriodRepository'
import ProductionRegisterRepository from '../../../repositories/implementations/ProductionRegisterRepository'
import PostCheckListUseCase from './postCheckListUseCase'
import PostCheckListController from './postCheckListController'
import CheckListItemRepository from '../../../repositories/implementations/CheckListItemRepository'
import CheckListPeriodRepository from '../../../repositories/implementations/CheckListPeriodRepository'

const productionRegisterRepository = new ProductionRegisterRepository()
const equipmentRepository = new EquipmentRepository()
const periodRepository = new PeriodRepository()
const checkListItemRepository = new CheckListItemRepository()
const checkListPeriodRepository = new CheckListPeriodRepository()

const useCase = new PostCheckListUseCase(
  productionRegisterRepository,
  equipmentRepository,
  periodRepository,
  checkListItemRepository,
  checkListPeriodRepository,
)

const controller = new PostCheckListController(useCase)

export default controller
