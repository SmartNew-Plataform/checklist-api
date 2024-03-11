import SmartCheckListRepository from '@/repositories/implementations/SmartCheckListRepository'
import GetChecklistUseCase from './getChecklistUseCase'
import GetChecklistsController from './getChecklistsController'

const checklistRepository = new SmartCheckListRepository()

const useCase = new GetChecklistUseCase(checklistRepository)
const controller = new GetChecklistsController(useCase)

export default controller
