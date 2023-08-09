import CheckListItemRepository from '../../../repositories/implementations/CheckListItemRepository'
import EquipmentRepository from '../../../repositories/implementations/EquipmentRepository'
import GetCheckListTaskByFamilyUseCase from './getCheckListTaskByFamilyUseCase'
import GetCheckListTaskByFamilyController from './getCheckListTaskByFamilyController'

const checkListItemRepository = new CheckListItemRepository()
const equipmentRepository = new EquipmentRepository()

const useCase = new GetCheckListTaskByFamilyUseCase(
  checkListItemRepository,
  equipmentRepository,
)

const controller = new GetCheckListTaskByFamilyController(useCase)

export default controller
