import { Prisma, smartnewsystem_producao_checklist_acao } from '@prisma/client'

export default interface IActionRepository {
  listByGroup(
    groupIds: number[],
    date: Date,
  ): Promise<smartnewsystem_producao_checklist_acao[]>
  findById(id: number): Promise<smartnewsystem_producao_checklist_acao | null>
  create(
    data: Prisma.smartnewsystem_producao_checklist_acaoUncheckedCreateInput,
  ): Promise<smartnewsystem_producao_checklist_acao>
  update(
    id: number,
    data: Prisma.smartnewsystem_producao_checklist_acaoUncheckedUpdateInput,
  ): Promise<smartnewsystem_producao_checklist_acao>
}
