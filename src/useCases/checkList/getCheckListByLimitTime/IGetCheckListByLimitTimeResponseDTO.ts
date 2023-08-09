import { Decimal } from '@prisma/client/runtime/library'

export default interface IGetCheckListByLimitTimeResponseDTO {
  id: number
  date: string
  period: string
  status: 'open' | 'close'
  code: string
  description: string
  equipmentId: number
  mileage: number | Decimal | null
  finalMileage: number | Decimal | null
  initialTime: string | Date | null
  login: string
  periodId: number | null
}
