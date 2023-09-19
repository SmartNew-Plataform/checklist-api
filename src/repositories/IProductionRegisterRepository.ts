import { Prisma, smartnewsystem_registro_producao } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import {
  IListByEquipment,
  IListRegisterByTime,
} from '../models/IProductionRegister'

export default interface IProductionRegisterRepository {
  listByEquipment(
    equipmentId: number | null,
    startDate: Date,
    endDate: Date,
    branch: number[],
  ): Promise<IListByEquipment[]>
  listByBranch(
    startDate: Date,
    endDate: Date,
    branch: number[],
  ): Promise<IListByEquipment[]>
  listRegisterByBranch(branch: number[]): Promise<IListRegisterByTime[]>
  listRegisterByTime(
    time: Date,
    branch: number[],
    login: string,
    fromDate: Date,
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
