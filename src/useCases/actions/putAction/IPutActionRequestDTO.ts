import { IUser } from '@/models/IUser'

export default interface IPutActionRequestDTO {
  user: IUser
  id: number
  title?: string
  responsible?: string
  description?: string
  dueDate?: Date
  endDate?: Date
}
