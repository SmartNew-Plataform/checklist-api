import {
  ICheckListItem,
  IFindTaskByFamily,
  IInfo,
} from '../models/ICheckListItem'

export default interface ICheckListItemRepository {
  findTaskByFamily(familyId: number): Promise<IFindTaskByFamily[]>
  info(clientId: number, branchIds: number[]): Promise<IInfo[]>
  listByCheckList(
    checkListId: number,
  ): Promise<ICheckListItem['listByCheckList'][]>
}
