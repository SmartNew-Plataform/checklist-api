import { IUser } from '../../../models/IUser'

export default interface IGetStatusActionRequestDTO {
  user: IUser
  taskId: number
  statusId: number
}
