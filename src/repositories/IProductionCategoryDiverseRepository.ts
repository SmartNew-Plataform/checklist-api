import { IProductionCategoryDiverseListByBranches } from '@/models/IProductionCategoryDiverse'

export default interface IProductionCategoryDiverseRepository {
  listByBranches(
    branches: number[],
  ): Promise<IProductionCategoryDiverseListByBranches[]>
}
