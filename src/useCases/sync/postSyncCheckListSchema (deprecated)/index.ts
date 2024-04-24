import EquipmentRepository from '../../../repositories/implementations/EquipmentRepository'
import ProductionRegisterRepository from '../../../repositories/implementations/ProductionRegisterRepository'
import PostSyncCheckListSchemaController from './postSyncCheckListSchemaController'
import PostSyncCheckListSchemaUseCase from './postSyncCheckListSchemaUseCase'

const productionRegisterRepository = new ProductionRegisterRepository()
const equipmentRepository = new EquipmentRepository()

const useCase = new PostSyncCheckListSchemaUseCase(
  productionRegisterRepository,
  equipmentRepository,
)

const controller = new PostSyncCheckListSchemaController(useCase)

export default controller
