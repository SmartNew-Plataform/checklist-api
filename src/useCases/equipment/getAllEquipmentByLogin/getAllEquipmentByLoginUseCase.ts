import IUseCase from '@/models/IUseCase'
import IEquipmentRepository from '@/repositories/IEquipmentRepository'
import IGetAllEquipmentByLoginRequestDTO from './IGetAllEquipmentByLoginRequestDTO'
import IGetAllEquipmentByLoginResponseDTO from './IGetAllEquipmentByLoginResponseDTO'

export default class GetAllEquipmentByLoginUseCase implements IUseCase {
  constructor(private equipmentRepository: IEquipmentRepository) {}

  async execute(data: IGetAllEquipmentByLoginRequestDTO) {
    const allEquipment = await this.equipmentRepository.listByBranch(
      data.user.branchBound.map((item) => item.branch.ID),
    )

    const response: IGetAllEquipmentByLoginResponseDTO[] = []

    for await (const item of allEquipment) {
      response.push({
        id: item.ID,
        code: item.equipamento_codigo || '',
        description: item.descricao || '',
        familyId: item.ID_familia || 0,
      })
    }

    return response
  }
}
