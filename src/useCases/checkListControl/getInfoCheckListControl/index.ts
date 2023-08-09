import CheckListControlRepository from '../../../repositories/implementations/CheckListControlRepository'
import GetInfoCheckListControlUseCase from './getInfoCheckListControlUseCase'
import GetInfoCheckListControlController from './getInfoCheckListControlController'

const checkListControlRepository = new CheckListControlRepository()

const useCase = new GetInfoCheckListControlUseCase(checkListControlRepository)

const controller = new GetInfoCheckListControlController(useCase)

export default controller
