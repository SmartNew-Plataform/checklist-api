import { IUser } from '../../../models/IUser'

export default interface IPatchCloseCheckListRequestDTO {
  productionRegisterId: number
  user: IUser
}
