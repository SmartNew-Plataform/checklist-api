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
    actions: {
      id: number
      title: string
      responsible: string
      description: string | null
      checklistId: number
      checklistPeriodId: number
      startDate: Date
      dueDate: Date
      endDate: Date
      equipmentId: number
    }[]
  }
}
