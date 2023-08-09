import { IUser } from '../../../models/IUser'

export default interface IGetCheckListLimitTimeRequestDTO {
  time: number
  user: IUser
}
