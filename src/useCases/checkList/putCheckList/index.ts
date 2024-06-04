import SmartCheckListRepository from '@/repositories/implementations/SmartCheckListRepository'
import PutCheckListUseCase from './PutCheckListUseCase'
import PutCheckListController from './PutChecklistController'
import EquipmentRegisterRepository from '@/repositories/implementations/EquipmentRegisterRepository'

const smartCheckListRepository = new SmartCheckListRepository()
const equipmentRegisterRepository = new EquipmentRegisterRepository()

const useCase = new PutCheckListUseCase(
  smartCheckListRepository,
  equipmentRegisterRepository,
)
const controller = new PutCheckListController(useCase)

export default controller
