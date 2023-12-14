import ActionGroupRepository from '@/repositories/implementations/ActionGroupRepository'
import ActionRepository from '@/repositories/implementations/ActionRepository'
import PutActionController from './putActionController'
import PutActionUseCase from './putActionUseCase'

const actionRepository = new ActionRepository()
const actionGroupRepository = new ActionGroupRepository()

const useCase = new PutActionUseCase(actionRepository, actionGroupRepository)
const controller = new PutActionController(useCase)

export default controller
