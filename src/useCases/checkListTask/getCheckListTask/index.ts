import CheckListItemRepository from '../../../repositories/implementations/CheckListItemRepository'
import GetCheckListTaskController from './getCheckListTaskController'
import GetCheckListTaskUseCase from './getCheckListTaskUseCase'

const checkListItemRepository = new CheckListItemRepository()

const useCase = new GetCheckListTaskUseCase(checkListItemRepository)

const controller = new GetCheckListTaskController(useCase)

export default controller
