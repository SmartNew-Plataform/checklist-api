import { Decimal } from '@prisma/client/runtime/library'

export default interface IGetMileageResponseDTO {
  mileage: number | Decimal
}
