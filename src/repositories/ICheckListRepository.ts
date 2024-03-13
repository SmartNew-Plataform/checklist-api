import { IFindByClient } from '../models/ICheckList'

export default interface ICheckListRepository {
  findByClient(branchIds: number[]): Promise<IFindByClient[]>
}
