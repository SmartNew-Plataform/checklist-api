import { Prisma, smartnewsystem_producao_checklist_acao } from '@prisma/client'

export default interface IActionRepository {
  findById(id: number): Promise<smartnewsystem_producao_checklist_acao | null>

  create(
    data: Prisma.smartnewsystem_producao_checklist_acaoUncheckedCreateInput,
  ): Promise<void>
  update(
    id: number,
    data: Prisma.smartnewsystem_producao_checklist_acaoUncheckedUpdateInput,
  ): Promise<void>
}
