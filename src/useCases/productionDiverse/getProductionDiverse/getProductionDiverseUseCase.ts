import IUseCase from '@/models/IUseCase'
import IGetProductionDiverseRequestDTO from './IGetProductionDiverseRequestDTO'
import IProductionCategoryDiverseRepository from '@/repositories/IProductionCategoryDiverseRepository'

export default class GetProductionDiverseUseCase implements IUseCase {
  constructor(
    private productionDiverseRepository: IProductionCategoryDiverseRepository,
  ) {}

  async execute(data: IGetProductionDiverseRequestDTO) {
    const allDiverse = await this.productionDiverseRepository.listByBranches(
      data.user.branchBound.map((item) => item.branch.ID),
    )

    return allDiverse.map((category) => {
      return {
        id: category.id,
        name: category.nome,
        items: category.items.map((item) => {
          return {
            id: item.id,
            name: item.nome,
          }
        }),
      }
    })
  }
}
