import ActionGroupRepository from '@/repositories/implementations/ActionGroupRepository'
import ActionRepository from '@/repositories/implementations/ActionRepository'
import GetByClientController from './getByClientController'
import GetByClientUseCase from './getByClientUseCase'

const actionRepository = new ActionRepository()
const actionGroupRepository = new ActionGroupRepository()

const useCase = new GetByClientUseCase(actionRepository, actionGroupRepository)
const controller = new GetByClientController(useCase)

export default controller
