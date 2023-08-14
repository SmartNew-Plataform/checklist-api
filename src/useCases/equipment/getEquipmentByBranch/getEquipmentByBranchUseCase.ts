import IUseCase from '../../../models/IUseCase'
import IGetEquipmentByBranchRequestDTO from './IGetEquipmentByBranchRequestDTO'
import IEquipmentRepository from '../../../repositories/IEquipmentRepository'
import IGetEquipmentByBranchResponseDTO from './IGetEquipmentByBranchResponseDTO'
import IEquipmentRegisterRepository from '../../../repositories/IEquipmentRegisterRepository'
export default class GetEquipmentByBranchUseCase implements IUseCase {
  constructor(
    private equipmentRepository: IEquipmentRepository,
    private equipmentRegisterRepository: IEquipmentRegisterRepository,
  ) {}

  async execute(data: IGetEquipmentByBranchRequestDTO) {
    const allEquipment = await this.equipmentRepository.listByBranch(
      data.user.branchBound.map((item) => item.branch.ID),
    )

    const response: IGetEquipmentByBranchResponseDTO[] = []

    for await (const item of allEquipment) {
      response.push({
        id: item.ID,
        code: item.equipamento_codigo || '',
        description: item.descricao || '',
        hasPeriod: item.registerEquipmentAction?.turno || true,
        hasMileage: item.registerEquipmentAction?.quilometragem || true,
        hasHourMeter: item.registerEquipmentAction?.horimetro || true,
        costCenter: item.id_centro_custo || 0,
        clientId: item.ID_cliente || 0,
        branchId: item.ID_filial || 0,
        mileage: item.registerEquipment
          ? Number(item.registerEquipment.quilometragem)
          : 0,
        familyId: item.ID_familia || 0,
        hourMeter: item.registerEquipment
          ? Number(item.registerEquipment.horimetro)
          : 0,
      })
    }

    return response
  }
}
