import CheckListStatusRepository from '../../../repositories/implementations/CheckListStatusRepository'
import GetStatusUseCase from './getStatusUseCase'
import GetStatusController from './getStatusController'

const checkListStatusRepository = new CheckListStatusRepository()

const useCase = new GetStatusUseCase(checkListStatusRepository)

const controller = new GetStatusController(useCase)

export default controller
