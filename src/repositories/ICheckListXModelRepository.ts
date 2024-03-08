import { ICheckListXModel } from '@/models/ICheckListXModel'

export default interface ICheckListXModelRepository {
  listByCheckList(
    checklistId: number,
  ): Promise<ICheckListXModel['listByCheckList'][]>
}
