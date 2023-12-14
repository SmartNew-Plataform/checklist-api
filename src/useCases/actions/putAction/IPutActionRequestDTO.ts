import { IUser } from '@/models/IUser'

export default interface IPutActionRequestDTO {
  user: IUser
  id: number
  title?: string | null
  responsible?: string | null
  description?: string | null
  dueDate?: Date | null
  endDate?: Date | null
}
