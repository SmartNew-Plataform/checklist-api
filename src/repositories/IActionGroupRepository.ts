import { IActionGroup } from '@/models/IActionGroup'
import {
  Prisma,
  smartnewsystem_producao_checklist_acao_grupo,
} from '@prisma/client'

// interface FindByIdType extends smartnewsystem_producao_checklist_acao_grupo {
//   productionRegister: {
//     id_equipamento: number
//   } | null
// }

export default interface IActionGroupRepository {
  listByClient(clientId: number): Promise<IActionGroup['listByClient'][]>
  listByEquipment(
    equipmentId: number,
  ): Promise<IActionGroup['listByEquipment'][]>
  create(
    data: Prisma.smartnewsystem_producao_checklist_acao_grupoUncheckedCreateInput,
  ): Promise<smartnewsystem_producao_checklist_acao_grupo>
  findById(id: number): Promise<IActionGroup['findById'] | null>
  update(
    id: number,
    data: Prisma.smartnewsystem_producao_checklist_acao_grupoUncheckedUpdateInput,
  ): Promise<smartnewsystem_producao_checklist_acao_grupo>
}
