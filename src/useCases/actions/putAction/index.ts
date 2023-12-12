import ActionRepository from '@/repositories/implementations/ActionRepository'
import PutActionController from './putActionController'
import PutActionUseCase from './putActionUseCase'

const actionRepository = new ActionRepository()

const useCase = new PutActionUseCase(actionRepository)
const controller = new PutActionController(useCase)

export default controller
