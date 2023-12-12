import { IUser } from '@/models/IUser'

export default interface IPostActionRequestDTO {
  user: IUser
  title: string
  responsible: string
  description: string | null
  checklistId: number
  checklistPeriodId: number
  startDate: Date
  dueDate: Date
  endDate: Date
  equipmentId: number
}
