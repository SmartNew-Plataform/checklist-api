import IUseCase from '../../../models/IUseCase'
import ICheckListStatusActionRepository from '../../../repositories/ICheckListStatusActionRepository'
import IGetStatusActionRequestDTO from './IGetStatusActionRequestDTO'

export default class GetStatusActionUseCase implements IUseCase {
  constructor(
    private checkListStatusActionRepository: ICheckListStatusActionRepository,
  ) {}

  async execute(data: IGetStatusActionRequestDTO) {
    const allStatusAction =
      await this.checkListStatusActionRepository.findByTaskAndStatus(
        data.taskId,
        data.statusId,
      )

    return {
      statusAction: allStatusAction,
    }
  }
}
