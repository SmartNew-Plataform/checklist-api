import { IUser } from '../../../models/IUser'

export default interface IPostSyncCheckListPeriodRequestDTO {
  user: IUser
  type: string
  checkListPeriod: {
    _id: string
    id: number
    branchId: number
    productionRegisterId: number
    checkListItemId: number
    statusItem: number
    statusNC: number | null
    observation: string | null
    logDate: Date
  }
}
