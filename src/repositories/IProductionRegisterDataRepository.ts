import { Decimal } from '@prisma/client/runtime/library'

export default interface IProductionRegisterDataRepository {
  findLastHourMeterByEquipment(equipmentId: number): Promise<number | Decimal>
}
