import IUseCase from '../../../models/IUseCase'
import ICheckListItemRepository from '../../../repositories/ICheckListItemRepository'
import IGetInfoItemRequestDTO from './IGetInfoItemRequestDTO'

export default class GetInfoItemUseCase implements IUseCase {
  constructor(private checkListItemRepository: ICheckListItemRepository) {}

  async execute(data: IGetInfoItemRequestDTO) {
    const allCheckListItem = await this.checkListItemRepository.info(
      data.user.id_cliente || 0,
      data.user.branchBound.map((item) => item.branch.ID),
    )

    return {
      checkListItem: allCheckListItem.map((item) => ({
        id: item.id,
        checklistId: item.id_checklist,
        taskId: item.id_tarefa,
        controlId: item.id_controle,
      })),
    }
  }
}
