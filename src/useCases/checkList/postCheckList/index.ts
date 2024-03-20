import EquipmentRepository from '../../../repositories/implementations/EquipmentRepository'
import PeriodRepository from '../../../repositories/implementations/PeriodRepository'
import ProductionRegisterRepository from '../../../repositories/implementations/ProductionRegisterRepository'
import PostCheckListUseCase from './postCheckListUseCase'
import PostCheckListController from './postCheckListController'
import CheckListItemRepository from '../../../repositories/implementations/CheckListItemRepository'
import CheckListPeriodRepository from '../../../repositories/implementations/CheckListPeriodRepository'
import SmartCheckListRepository from '@/repositories/implementations/SmartCheckListRepository'
import LocationRepository from '@/repositories/implementations/LocationRepository'
import CheckListXModelRepository from '@/repositories/implementations/CheckListXModelRepository'

const productionRegisterRepository = new ProductionRegisterRepository()
const equipmentRepository = new EquipmentRepository()
const periodRepository = new PeriodRepository()
const checkListItemRepository = new CheckListItemRepository()
const checkListPeriodRepository = new CheckListPeriodRepository()
const smartCheckListRepository = new SmartCheckListRepository()
const locationRepository = new LocationRepository()
const checklistXModelRepository = new CheckListXModelRepository()

const useCase = new PostCheckListUseCase(
  productionRegisterRepository,
  equipmentRepository,
  periodRepository,
  checkListItemRepository,
  checkListPeriodRepository,
  smartCheckListRepository,
  locationRepository,
  checklistXModelRepository,
)

const controller = new PostCheckListController(useCase)

export default controller
