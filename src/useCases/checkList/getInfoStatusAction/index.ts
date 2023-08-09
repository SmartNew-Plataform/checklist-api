import CheckListStatusActionRepository from '../../../repositories/implementations/CheckListStatusActionRepository'
import GetInfoStatusActionUseCase from './getInfoStatusActionUseCase'
import GetInfoStatusActionController from './getInfoStatusActionController'

const checkListStatusActionRepository = new CheckListStatusActionRepository()

const useCase = new GetInfoStatusActionUseCase(checkListStatusActionRepository)

const controller = new GetInfoStatusActionController(useCase)

export default controller
