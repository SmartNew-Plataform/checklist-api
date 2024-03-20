import { IUser } from '@/models/IUser'

export interface IPutChecklistRequestDTO {
  user: IUser
  id: number
  status: 'open' | 'close'
  finalTime: Date | null
}
