import { IUser } from '@/models/IUser'

export default interface IGetActionGroupByIdRequestDTO {
  user: IUser
  id: number
}
