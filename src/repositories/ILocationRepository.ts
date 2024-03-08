import { ILocation } from '@/models/ILocation'

export default interface ILocationRepository {
  listByBranch(branchId: number[]): Promise<ILocation['listByBranch'][]>
  findById(id: number): Promise<ILocation['findById'] | null>
}
