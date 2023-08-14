import CheckListPeriodRepository from '../../../repositories/implementations/CheckListPeriodRepository'
import GetInfoByLoginUseCase from './getInfoByLoginUseCase'
import GetInfoByLoginController from './getInfoByLoginController'
import FTPService from '@/services/implementations/FTPService'

const checkListPeriodRepository = new CheckListPeriodRepository()
const ftpService = new FTPService()

const useCase = new GetInfoByLoginUseCase(checkListPeriodRepository, ftpService)

const controller = new GetInfoByLoginController(useCase)

export default controller
