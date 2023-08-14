import { IInfoByLogin } from '../models/ICheckListPeriod'
import { Prisma, smartnewsystem_producao_checklist_turno } from '@prisma/client'

export default interface ICheckListPeriodRepository {
  countForStatus(statusId: number): Promise<number>
  countForEquipment(equipmentId: number): Promise<number>
  infoByLogin(login: string): Promise<IInfoByLogin[]>
  listForProductionRegister(
    productionRegisterId: number,
  ): Promise<smartnewsystem_producao_checklist_turno[]>
  create(
    data: Prisma.smartnewsystem_producao_checklist_turnoUncheckedCreateInput,
  ): Promise<smartnewsystem_producao_checklist_turno>
  update(
    id: number,
    data: Prisma.smartnewsystem_producao_checklist_turnoUpdateInput,
  ): Promise<smartnewsystem_producao_checklist_turno>
}
