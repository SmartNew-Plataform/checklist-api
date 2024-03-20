import CheckListPeriodRepository from '../../../repositories/implementations/CheckListPeriodRepository'
import GetInfoByLoginController from './getInfoByLoginController'
import GetInfoByLoginUseCase from './getInfoByLoginUseCase'

const checkListPeriodRepository = new CheckListPeriodRepository()

const useCase = new GetInfoByLoginUseCase(checkListPeriodRepository)

const controller = new GetInfoByLoginController(useCase)

export default controller
