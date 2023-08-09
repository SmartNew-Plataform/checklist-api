import CheckListPeriodRepository from '../../../repositories/implementations/CheckListPeriodRepository'
import PutCheckListPeriodUseCase from './putCheckListPeriodUseCase'
import PutChecKListPeriodController from './putCheckListPeriodController'

const checkListPeriodRepository = new CheckListPeriodRepository()

const useCase = new PutCheckListPeriodUseCase(checkListPeriodRepository)

const controller = new PutChecKListPeriodController(useCase)

export default controller
