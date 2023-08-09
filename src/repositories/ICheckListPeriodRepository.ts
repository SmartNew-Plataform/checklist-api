import { IInfoByLogin } from '../models/ICheckListPeriod'
import { Prisma, smartnewsystem_producao_checklist_turno } from '@prisma/client'

export default interface ICheckListPeriodRepository {
  infoByLogin(login: string): Promise<IInfoByLogin[]>
  create(
    data: Prisma.smartnewsystem_producao_checklist_turnoUncheckedCreateInput,
  ): Promise<smartnewsystem_producao_checklist_turno>
  update(
    id: number,
    data: Prisma.smartnewsystem_producao_checklist_turnoUpdateInput,
  ): Promise<smartnewsystem_producao_checklist_turno>
}
