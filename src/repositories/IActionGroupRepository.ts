import {
  Prisma,
  smartnewsystem_producao_checklist_acao_grupo,
} from '@prisma/client'

export default interface IActionGroupRepository {
  listByClient(
    clientId: number,
  ): Promise<smartnewsystem_producao_checklist_acao_grupo[]>
  create(
    data: Prisma.smartnewsystem_producao_checklist_acao_grupoUncheckedCreateInput,
  ): Promise<smartnewsystem_producao_checklist_acao_grupo>
}
