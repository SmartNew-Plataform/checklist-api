import { IUser } from '@/models/IUser'

export default interface IGetActionByIdRequestDTO {
  user: IUser
  id: number
}
