import {
  IFindById,
  IListByBranch,
  IListFamilyByBranch,
} from '../models/IEquipment'

export default interface IEquipmentRepository {
  listByBranch(branch: number[]): Promise<IListByBranch[]>
  listFamilyByBranch(branch: number[]): Promise<IListFamilyByBranch[]>
  findById(id: number): Promise<IFindById | null>
  updateHourMeterAndMileage(
    id: number,
    hourMeter: number,
    mileage: number,
  ): Promise<IListByBranch | null>
}
