import { IUser } from '@/models/IUser'

export interface IPutChecklistRequestDTO {
  user: IUser
  id: number
  status: 'open' | 'close'
  finalTime: Date | null
  hourMeter?: number | null
  odometer?: number | null
  mileage?: number | null
}
