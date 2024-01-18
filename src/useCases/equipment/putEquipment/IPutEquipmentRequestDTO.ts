import { IUser } from '@/models/IUser'

export default interface IPutEquipmentRequestDTO {
  id: number
  mileage: number
  hourMeter: number
  user: IUser
}
