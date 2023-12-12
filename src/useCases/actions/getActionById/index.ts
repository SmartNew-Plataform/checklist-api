import ActionRepository from '@/repositories/implementations/ActionRepository'
import GetActionByIdController from './getActionByIdController'
import GetActionByIdUseCase from './getActionByIdUseCase'

const actionRepository = new ActionRepository()

const useCase = new GetActionByIdUseCase(actionRepository)
const controller = new GetActionByIdController(useCase)

export default controller
