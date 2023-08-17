import IUseCase from '../../../models/IUseCase'
import IGetCheckListTaskByFamilyRequestDTO from '../getCheckListTaskByFamily/IGetCheckListTaskByFamilyRequestDTO'
import IEquipmentRepository from '../../../repositories/IEquipmentRepository'
import ICheckListItemRepository from '../../../repositories/ICheckListItemRepository'
import IGetCheckListTaskResponseDTO from './IGetCheckListTaskResponseDTO'

export default class GetCheckListTaskUseCase implements IUseCase {
  constructor(
    private equipmentRepository: IEquipmentRepository,
    private checkListItemRepository: ICheckListItemRepository,
  ) {}

  async execute(data: IGetCheckListTaskByFamilyRequestDTO) {
    const allFamily = await this.equipmentRepository.listFamilyByBranch(
      data.user.branchBound.map((item) => item.branch.ID),
    )

    const response: IGetCheckListTaskResponseDTO[] = []

    for await (const item of allFamily) {
      const allTask = await this.checkListItemRepository.findTaskByFamily(
        item.ID_familia || 0,
      )

      if (allTask.length) {
        const formatArray = allTask.map((value) => {
          return {
            id: value.checkListTask?.id || 0,
            description: value.checkListTask?.descricao || '',
            familyId: item.ID_familia || 0,
            controlId: value.id_controle || 0,
          }
        })

        formatArray.forEach((value) => {
          if (!response.find((item) => item.id === value.id)) {
            response.push({
              id: value.id,
              description: value.description,
              familyId: value.familyId,
              controlId: value.controlId,
            })
          }
        })
      }
    }

    return {
      task: response,
    }
  }
}
