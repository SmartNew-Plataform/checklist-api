import { IUser } from '../../../models/IUser'

export default interface IGetCheckListTaskByFamilyRequestDTO {
  user: IUser
  familyId: number
  equipmentId?: number
}
