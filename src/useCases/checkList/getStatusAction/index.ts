import CheckListStatusActionRepository from '../../../repositories/implementations/CheckListStatusActionRepository'
import GetStatusActionUseCase from './getStatusActionUseCase'
import GetStatusActionController from './getStatusActionController'

const checkListStatusActionRepository = new CheckListStatusActionRepository()

const useCase = new GetStatusActionUseCase(checkListStatusActionRepository)

const controller = new GetStatusActionController(useCase)

export default controller
