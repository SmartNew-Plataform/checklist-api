import { IInfo } from '../models/ICheckListStatus'

export default interface ICheckListStatusRepository {
  info(clientId: number): Promise<IInfo[]>
}
