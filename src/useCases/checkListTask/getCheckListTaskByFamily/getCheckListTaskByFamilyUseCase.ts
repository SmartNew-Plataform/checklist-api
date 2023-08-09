import IUseCase from '../../../models/IUseCase'
import IGetCheckListTaskByFamilyResponseDTO from './IGetCheckListTaskByFamilyResposeDTO'
import ICheckListItemRepository from '../../../repositories/ICheckListItemRepository'
import IGetCheckListTaskByFamilyRequestDTO from './IGetCheckListTaskByFamilyRequestDTO'
import IEquipmentRepository from '../../../repositories/IEquipmentRepository'
import CustomError from '@/config/CustomError'

export default class GetCheckListTaskByFamilyUseCase implements IUseCase {
  constructor(
    private checkListItemRepository: ICheckListItemRepository,
    private equipmentRepository: IEquipmentRepository,
  ) {}

  async execute(data: IGetCheckListTaskByFamilyRequestDTO) {
    let familyId = data.familyId

    if (data.equipmentId) {
      const equipment = await this.equipmentRepository.findById(
        data.equipmentId,
      )

      if (!equipment) {
        throw CustomError.notFound('Equipamento não encontrado')
      }

      familyId = equipment.ID_familia || 0
    }

    const allTask = await this.checkListItemRepository.findTaskByFamily(
      familyId,
    )

    const response: IGetCheckListTaskByFamilyResponseDTO[] = allTask.map(
      (item) => {
        return {
          id: item.checkListTask?.id || 0,
          description: item.checkListTask?.descricao || '',
        }
      },
    )

    return {
      task: response,
    }
  }
}
