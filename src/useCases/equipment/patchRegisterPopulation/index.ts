import EquipmentRegisterRepository from '../../../repositories/implementations/EquipmentRegisterRepository'
import EquipmentRepository from '../../../repositories/implementations/EquipmentRepository'
import ProductionRegisterDataRepository from '../../../repositories/implementations/ProductionRegisterDataRepository'
import ProductionRegisterRepository from '../../../repositories/implementations/ProductionRegisterRepository'
import PatchRegisterPopulationUseCase from './patchRegisterPopulationUseCase'
import PatchRegisterPopulationController from './patchRegisterPopulationController'

const equipmentRegisterRepository = new EquipmentRegisterRepository()
const equipmentRepository = new EquipmentRepository()
const productionRegisterRepository = new ProductionRegisterRepository()
const productionRegisterDataRepository = new ProductionRegisterDataRepository()

const useCase = new PatchRegisterPopulationUseCase(
  equipmentRegisterRepository,
  equipmentRepository,
  productionRegisterRepository,
  productionRegisterDataRepository,
)

const controller = new PatchRegisterPopulationController(useCase)

export default controller
