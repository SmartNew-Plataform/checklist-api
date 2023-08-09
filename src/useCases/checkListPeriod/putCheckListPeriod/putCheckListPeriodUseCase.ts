import IUseCase from '../../../models/IUseCase'
import ICheckListPeriodRepository from '../../../repositories/ICheckListPeriodRepository'
import IPutCheckListPeriodRequestDTO from './IPutCheckListPeriodRequestDTO'

export default class PutCheckListPeriodUseCase implements IUseCase {
  constructor(private checkListPeriodRepository: ICheckListPeriodRepository) {}

  async execute(data: IPutCheckListPeriodRequestDTO) {
    await this.checkListPeriodRepository.update(data.checkListPeriodId, {
      status_item: data.statusId,
      status_item_nc: data.statusAction,
      observacao: data.observation,
    })

    return {
      updated: true,
    }
  }
}
