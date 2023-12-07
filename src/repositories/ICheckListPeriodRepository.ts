import { Prisma, smartnewsystem_producao_checklist_turno } from '@prisma/client'
import { IInfoByLogin } from '../models/ICheckListPeriod'

export default interface ICheckListPeriodRepository {
  countForStatusByBranch(branches: number[]): Promise<any>
  countForStatus(statusId: number): Promise<number>
  countForEquipment(equipmentId: number): Promise<number>
  infoByLogin(login: string, date: Date): Promise<IInfoByLogin[]>
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
