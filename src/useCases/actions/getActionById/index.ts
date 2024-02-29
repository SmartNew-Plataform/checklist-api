import ActionRepository from '@/repositories/implementations/ActionRepository'
import FileService from '@/services/implementations/FileService'
import GetActionByIdController from './getActionByIdController'
import GetActionByIdUseCase from './getActionByIdUseCase'

const actionRepository = new ActionRepository()
const fileService = new FileService()

const useCase = new GetActionByIdUseCase(actionRepository, fileService)
const controller = new GetActionByIdController(useCase)

export default controller
