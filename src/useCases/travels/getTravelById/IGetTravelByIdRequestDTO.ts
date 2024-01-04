import { IUser } from '@/models/IUser'

export default interface IGetTravelByIdRequestDTO {
  user: IUser
  id: number
}
