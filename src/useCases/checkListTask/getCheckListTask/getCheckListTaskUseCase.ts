import IUseCase from '../../../models/IUseCase'
import ICheckListItemRepository from '../../../repositories/ICheckListItemRepository'
import IGetCheckListTaskByFamilyRequestDTO from '../getCheckListTaskByFamily/IGetCheckListTaskByFamilyRequestDTO'

export default class GetCheckListTaskUseCase implements IUseCase {
  constructor(private checkListItemRepository: ICheckListItemRepository) {}

  async execute(data: IGetCheckListTaskByFamilyRequestDTO) {
    const allTask = await this.checkListItemRepository.info(
      data.user.id_cliente || 0,
      data.user.branchBound.map((item) => item.branch.ID),
    )

    const formatArray = allTask.map((value) => ({
      id: value.checkListTask?.id || 0,
      description: value.checkListTask?.descricao || '',
      checklistId: value.checkList?.id || 0,
      controlId: value.id_controle || 0,
      required_photo: value.requer_foto ? value.requer_foto === 1 : false,
    }))

    return {
      task: formatArray,
    }
  }
}
