import { IUser } from '@/models/IUser'

export default interface IGetDashForFilterRequestDTO {
  user: IUser
  startDate?: Date | undefined
  endDate?: Date | undefined
  equipment?: number[] | undefined
  branch: number[]
}
