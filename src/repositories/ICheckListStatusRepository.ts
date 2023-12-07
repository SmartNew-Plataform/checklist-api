import {
  ICountByBranch,
  IFindByClient,
  IInfo,
  IListByEquipmentAndDate,
} from '../models/ICheckListStatus'

export default interface ICheckListStatusRepository {
  listByEquipmentAndDate(
    equipmentId: number[],
    startDate: Date,
    endDate: Date,
  ): Promise<IListByEquipmentAndDate[]>
  countByBranch(
    branches: number[],
    startDate: Date,
    endDate: Date,
  ): Promise<ICountByBranch[]>
  info(clientId: number): Promise<IInfo[]>
  findByClient(clientId: number): Promise<IFindByClient[]>
}
