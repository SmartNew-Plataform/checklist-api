import { IUser } from '../../../models/IUser'

export default interface IPutCheckListPeriodRequestDTO {
  checkListPeriodId: number
  user: IUser
  statusId: number
  statusAction?: number | null
  observation: string
}
