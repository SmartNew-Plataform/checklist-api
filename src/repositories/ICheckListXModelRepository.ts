import { ICheckListXModel } from '@/models/ICheckListXModel'
import { Prisma, smartnewsystem_checklist_x_modelo } from '@prisma/client'

export default interface ICheckListXModelRepository {
  listByCheckList(
    checklistId: number,
  ): Promise<ICheckListXModel['listByCheckList'][]>
  insert(
    data: Prisma.smartnewsystem_checklist_x_modeloUncheckedCreateInput,
  ): Promise<smartnewsystem_checklist_x_modelo>
}
