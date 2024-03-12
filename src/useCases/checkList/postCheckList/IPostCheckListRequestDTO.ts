import { IUser } from '../../../models/IUser'

export default interface IPostCheckListRequestDTO {
  user: IUser
  equipmentId: number | null
  locationId: number | null
  periodId: number | null
  model: number[]
  initialTime: Date
}
