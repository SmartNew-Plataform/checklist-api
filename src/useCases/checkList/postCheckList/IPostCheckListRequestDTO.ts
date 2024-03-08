import { IUser } from '../../../models/IUser'

export default interface IPostCheckListRequestDTO {
  user: IUser
  equipmentId: number | null
  locationId: number | null
  periodId: number | null
  model: number[]
  initialHourMeter?: number
  initialTime?: Date
  mileage: number
}
