import {
  IListByEquipment,
  IListRegisterByTime,
} from '../models/IProductionRegister'
import { Prisma, smartnewsystem_registro_producao } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

export default interface IProductionRegisterRepository {
  listByEquipment(
    equipmentId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<IListByEquipment[]>
  listRegisterByBranch(branch: number[]): Promise<IListRegisterByTime[]>
  listRegisterByTime(
    time: Date,
    branch: number[],
    login: string,
  ): Promise<IListRegisterByTime[]>
  findLastMileageByEquipment(equipmentId: number): Promise<number | Decimal>
  save(
    data: Prisma.smartnewsystem_registro_producaoUncheckedCreateInput,
  ): Promise<smartnewsystem_registro_producao>
  update(
    id: number,
    data: Prisma.smartnewsystem_registro_producaoUpdateInput,
  ): Promise<void>
}
