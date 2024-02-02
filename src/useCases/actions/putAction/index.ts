import ActionGroupRepository from '@/repositories/implementations/ActionGroupRepository'
import ActionRepository from '@/repositories/implementations/ActionRepository'
import FileService from '@/services/implementations/FileService'
import PutActionController from './putActionController'
import PutActionUseCase from './putActionUseCase'

const actionRepository = new ActionRepository()
const actionGroupRepository = new ActionGroupRepository()
const fileService = new FileService()

const useCase = new PutActionUseCase(
  actionRepository,
  actionGroupRepository,
  fileService,
)
const controller = new PutActionController(useCase)

export default controller
