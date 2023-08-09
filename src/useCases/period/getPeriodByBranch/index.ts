import PeriodRepository from '../../../repositories/implementations/PeriodRepository'
import GetPeriodByBranchUseCase from './getPeriodByBranchUseCase'
import GetPeriodByBranchController from './getPeriodByBranchController'

const periodRepository = new PeriodRepository()

const useCase = new GetPeriodByBranchUseCase(periodRepository)

const controller = new GetPeriodByBranchController(useCase)

export default controller
