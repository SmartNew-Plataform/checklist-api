import { IUser } from '@/models/IUser'

export default interface IGetDashForFilterRequestDTO {
  user: IUser
  startDate: Date
  endDate: Date
  equipment: number[]
  branch: number[]
}
