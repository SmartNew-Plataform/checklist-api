import { IFindByClient } from '../models/ICheckList'

export default interface ICheckListRepository {
  findByClient(clientId: number): Promise<IFindByClient[]>
}
