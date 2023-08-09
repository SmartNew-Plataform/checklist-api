import { IUser } from '../../../models/IUser'

export default interface IGetPeriodByBranchRequestDTO {
  user: IUser
  branchId: number
}
