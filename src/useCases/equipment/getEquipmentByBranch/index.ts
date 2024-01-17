import ActionGroupRepository from '@/repositories/implementations/ActionGroupRepository'
import EquipmentRepository from '../../../repositories/implementations/EquipmentRepository'
import GetEquipmentByBranchController from './getEquipmentByBranchController'
import GetEquipmentByBranchUseCase from './getEquipmentByBranchUseCase'

const equipmentRepository = new EquipmentRepository()
const actionGroupRepository = new ActionGroupRepository()

const useCase = new GetEquipmentByBranchUseCase(
  equipmentRepository,
  actionGroupRepository,
)

const controller = new GetEquipmentByBranchController(useCase)

export default controller
