import CheckListRepository from '../../../repositories/implementations/CheckListRepository'
import GetBoundFamilyUseCase from './getBoundFamilyUseCase'
import GetBoundFamilyController from './getBoundFamilyController'

const checkListRepository = new CheckListRepository()

const useCase = new GetBoundFamilyUseCase(checkListRepository)

const controller = new GetBoundFamilyController(useCase)

export default controller
