import ActionGroupRepository from '@/repositories/implementations/ActionGroupRepository'
import GetActionGroupByIdController from './getActionGroupByIdController'
import GetActionGroupByIdUseCase from './getActionGroupByIdUseCase'

const actionGroupRepostiory = new ActionGroupRepository()

const useCase = new GetActionGroupByIdUseCase(actionGroupRepostiory)
const controller = new GetActionGroupByIdController(useCase)

export default controller
