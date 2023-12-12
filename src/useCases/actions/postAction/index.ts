import ActionGroupRepository from '@/repositories/implementations/ActionGroupRepository'
import ActionRepository from '@/repositories/implementations/ActionRepository'
import PostActionController from './postActionController'
import PostActionUseCase from './postActionUseCase'

const actionRepository = new ActionRepository()
const actionGroupRepository = new ActionGroupRepository()

const useCase = new PostActionUseCase(actionRepository, actionGroupRepository)
const controller = new PostActionController(useCase)

export default controller
