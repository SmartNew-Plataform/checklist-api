import { IUser } from '../../../models/IUser'

export default interface IPostSyncCheckListSchemaRequestDTO {
  user: IUser
  type: string
  checkListSchema: {
    _id: string
    id: number
    date: Date
    code: string
    description: string
    status: 'open' | 'close'
    equipmentId: number
    mileage: number
    finalMileage: number
    initialTime: Date
    finalTime?: Date | undefined
    login: string
    periodId: number
  }
}
