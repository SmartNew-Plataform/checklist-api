import { IUser } from '../../../models/IUser'

export default interface IGetMileageRequestDTO {
  equipmentId: number
  user: IUser
}
