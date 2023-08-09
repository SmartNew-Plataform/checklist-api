import { IUser } from '../../../models/IUser'

export default interface IPostCheckListRequestDTO {
  user: IUser
  equipmentId: number
  periodId: number
  initialHourMeter?: number
  initialTime?: Date
  mileage: number
}
