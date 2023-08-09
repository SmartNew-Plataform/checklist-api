import { IByClient } from '../models/ICheckListTask'

export default interface ICheckListTaskRepository {
  byClient(clientId: number): Promise<IByClient[]>
}
