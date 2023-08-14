import {
  IListByBranch,
  IListFamilyByBranch,
  IFindById,
} from '../models/IEquipment'

export default interface IEquipmentRepository {
  listByBranch(branch: number[]): Promise<IListByBranch[]>
  listFamilyByBranch(branch: number[]): Promise<IListFamilyByBranch[]>
  findById(id: number): Promise<IFindById | null>
}
