import SmartCheckListRepository from '@/repositories/implementations/SmartCheckListRepository'
import PutCheckListUseCase from './PutCheckListUseCase'
import PutCheckListController from './PutChecklistController'

const smartCheckListRepository = new SmartCheckListRepository()

const useCase = new PutCheckListUseCase(smartCheckListRepository)
const controller = new PutCheckListController(useCase)

export default controller
