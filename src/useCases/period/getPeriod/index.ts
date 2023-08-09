import PeriodRepository from '../../../repositories/implementations/PeriodRepository'
import GetPeriodUseCase from './getPeriodUseCase'
import GetPeriodController from './getPeriodController'

const periodRepository = new PeriodRepository()

const useCase = new GetPeriodUseCase(periodRepository)

const controller = new GetPeriodController(useCase)

export default controller
