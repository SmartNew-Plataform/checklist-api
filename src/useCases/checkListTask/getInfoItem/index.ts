import CheckListItemRepository from '../../../repositories/implementations/CheckListItemRepository'
import GetInfoItemController from './getInfoItemController'
import GetInfoItemUseCase from './getInfoItemUseCase'

const checkListItemRepository = new CheckListItemRepository()

const useCase = new GetInfoItemUseCase(checkListItemRepository)

const controller = new GetInfoItemController(useCase)

export default controller
