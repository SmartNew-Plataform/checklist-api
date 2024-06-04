import { IUser } from '../../../models/IUser'

export default interface IPostCheckListRequestDTO {
  user: IUser
  equipmentId: number | null
  locationId: number | null
  periodId: number | null
  hourMeter?: number | null
  odometer?: number | null
  mileage?: number | null
  model: number[]
  initialTime: Date
  finalTime: Date | null
  status: 'open' | 'close'
}
