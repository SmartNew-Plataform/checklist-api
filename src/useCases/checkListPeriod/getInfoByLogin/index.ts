import CheckListPeriodRepository from '../../../repositories/implementations/CheckListPeriodRepository'
import GetInfoByLoginUseCase from './getInfoByLoginUseCase'
import GetInfoByLoginController from './getInfoByLoginController'

const checkListPeriodRepository = new CheckListPeriodRepository()

const useCase = new GetInfoByLoginUseCase(checkListPeriodRepository)

const controller = new GetInfoByLoginController(useCase)

export default controller
