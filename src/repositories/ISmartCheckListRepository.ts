import { ISmartCheckList } from '@/models/ISmartCheckList'
import { Prisma, smartnewsystem_checklist } from '@prisma/client'

export default interface ISmartCheckListRepository {
  listByEquipment(
    equipmentId: number | null,
    startDate: Date,
    endDate: Date,
    branch: number[],
  ): Promise<ISmartCheckList['listByEquipment'][]>

  listByBranch(
    startDate: Date,
    endDate: Date,
    branch: number[],
  ): Promise<ISmartCheckList['listByBranch'][]>

  listRegisterByTime(
    time: Date,
    branch: number[],
    login: string,
    fromDate: Date,
  ): Promise<ISmartCheckList['listRegisterByTime'][]>

  listRegisterByBranch(
    branch: number[],
  ): Promise<ISmartCheckList['listRegisterByBranch'][]>

  save(
    data: Prisma.smartnewsystem_checklistUncheckedCreateInput,
  ): Promise<smartnewsystem_checklist>

  update(
    id: number,
    data: Prisma.smartnewsystem_checklistUpdateInput,
  ): Promise<void>
}
