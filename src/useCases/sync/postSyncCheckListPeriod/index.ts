import ActionGroupRepository from '@/repositories/implementations/ActionGroupRepository'
import ActionRepository from '@/repositories/implementations/ActionRepository'
import CheckListPeriodRepository from '@/repositories/implementations/CheckListPeriodRepository'
import PostSyncCheckListPeriodController from './postSyncCheckListPeriodController'
import PostSyncCheckListPeriodUseCase from './postSyncCheckListPeriodUseCase'

const checkListPeriodRepository = new CheckListPeriodRepository()
const actionRepository = new ActionRepository()
const actionGroupRepository = new ActionGroupRepository()

const useCase = new PostSyncCheckListPeriodUseCase(
  checkListPeriodRepository,
  actionRepository,
  actionGroupRepository,
)

const controller = new PostSyncCheckListPeriodController(useCase)

export default controller
