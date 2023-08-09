import { IInfo } from '../models/ICheckListControl'

export default interface ICheckListControlRepository {
  info(): Promise<IInfo[]>
}
