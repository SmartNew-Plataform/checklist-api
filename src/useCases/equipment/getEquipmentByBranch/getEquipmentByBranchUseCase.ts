import IActionGroupRepository from '@/repositories/IActionGroupRepository'
import { smartnewsystem_producao_checklist_acao_grupo } from '@prisma/client'
import IUseCase from '../../../models/IUseCase'
import IEquipmentRepository from '../../../repositories/IEquipmentRepository'
import IGetEquipmentByBranchRequestDTO from './IGetEquipmentByBranchRequestDTO'
import IGetEquipmentByBranchResponseDTO from './IGetEquipmentByBranchResponseDTO'

export default class GetEquipmentByBranchUseCase implements IUseCase {
  constructor(
    private equipmentRepository: IEquipmentRepository,
    private actionGroupRepository: IActionGroupRepository,
  ) {}

  async execute(data: IGetEquipmentByBranchRequestDTO) {
    const allEquipment = await this.equipmentRepository.listByBranch(
      data.user.branchBound.map((item) => item.branch.ID),
    )

    const response: IGetEquipmentByBranchResponseDTO[] = []

    for await (const item of allEquipment) {
      // console.log(item)

      const actions = await this.actionGroupRepository.listByEquipment(item.ID)
      const openedActions: smartnewsystem_producao_checklist_acao_grupo[] = []

      if (actions) {
        actions.forEach((action) => {
          if (!action.data_concluida) {
            openedActions.push(action)
          }
        })
      }

      response.push({
        id: item.ID,
        code: item.equipamento_codigo || '',
        description: item.descricao || '',
        hasPeriod: item.registerEquipmentAction
          ? item.registerEquipmentAction.turno
          : true,
        hasMileage: item.registerEquipmentAction
          ? item.registerEquipmentAction.quilometragem
          : true,
        hasHourMeter: item.registerEquipmentAction
          ? item.registerEquipmentAction.horimetro
          : true,
        hasAction: openedActions.length > 0,
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
