import EquipmentRepository from '../../../repositories/implementations/EquipmentRepository'
import GetEquipmentByBranchUseCase from './getEquipmentByBranchUseCase'
import GetEquipmentByBranchController from './getEquipmentByBranchController'
import EquipmentRegisterRepository from '../../../repositories/implementations/EquipmentRegisterRepository'

const equipmentRepository = new EquipmentRepository()
const equipmentRegisterRepository = new EquipmentRegisterRepository()

const useCase = new GetEquipmentByBranchUseCase(
  equipmentRepository,
  equipmentRegisterRepository,
)

const controller = new GetEquipmentByBranchController(useCase)

export default controller
