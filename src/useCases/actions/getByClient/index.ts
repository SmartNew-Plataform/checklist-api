import ActionGroupRepository from '@/repositories/implementations/ActionGroupRepository'
import ActionRepository from '@/repositories/implementations/ActionRepository'
import FileService from '@/services/implementations/FileService'
import GetByClientController from './getByClientController'
import GetByClientUseCase from './getByClientUseCase'

const actionRepository = new ActionRepository()
const actionGroupRepository = new ActionGroupRepository()
const fileService = new FileService()

const useCase = new GetByClientUseCase(
  actionRepository,
  actionGroupRepository,
  fileService,
)
const controller = new GetByClientController(useCase)

export default controller
