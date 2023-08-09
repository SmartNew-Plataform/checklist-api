import { IUser } from '../../../models/IUser'

export default interface IGetHourMeterAndMileageRequestDTO {
  equipmentId: number
  user: IUser
}
