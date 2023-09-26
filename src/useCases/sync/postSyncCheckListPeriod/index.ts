import CheckListPeriodRepository from '@/repositories/implementations/CheckListPeriodRepository'
import PostSyncCheckListPeriodController from './postSyncCheckListPeriodController'
import PostSyncCheckListPeriodUseCase from './postSyncCheckListPeriodUseCase'

const checkListPeriodRepository = new CheckListPeriodRepository()

const useCase = new PostSyncCheckListPeriodUseCase(checkListPeriodRepository)

const controller = new PostSyncCheckListPeriodController(useCase)

export default controller
