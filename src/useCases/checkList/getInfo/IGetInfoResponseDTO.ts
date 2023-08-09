import { Decimal } from '@prisma/client/runtime/library'

export default interface IGetInfoResponseDTO {
  id: number
  costCenterId: number
  equipmentId: number
  periodId: number | null
  initialMileage: number | Decimal | null
  finalMileage: number | Decimal | null
  login: string
  date: Date | null
  initialTime: Date | null
  finalTime: Date | null
  status: 'open' | 'close'
  dataLog: Date | null
  code: string
  description: string
}
