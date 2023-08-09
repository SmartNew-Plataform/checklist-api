import CheckListItemRepository from '../../../repositories/implementations/CheckListItemRepository'
import EquipmentRepository from '../../../repositories/implementations/EquipmentRepository'
import GetCheckListTaskUseCase from './getCheckListTaskUseCase'
import GetCheckListTaskController from './getCheckListTaskController'

const equipmentRepository = new EquipmentRepository()
const checkListItemRepository = new CheckListItemRepository()

const useCase = new GetCheckListTaskUseCase(
  equipmentRepository,
  checkListItemRepository,
)

const controller = new GetCheckListTaskController(useCase)

export default controller
