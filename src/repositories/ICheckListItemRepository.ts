import { IFindTaskByFamily, IInfo } from '../models/ICheckListItem'

export default interface ICheckListItemRepository {
  findTaskByFamily(familyId: number): Promise<IFindTaskByFamily[]>
  info(clientId: number): Promise<IInfo[]>
}
