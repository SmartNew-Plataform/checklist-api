import { prisma } from '@/lib/prisma'
import { IProductionCategoryDiverseListByBranches } from '@/models/IProductionCategoryDiverse'

export default class ProductionCategoryDiverseRepository {
  private table = prisma.smartnewsystem_producao_categoria_diversos

  async listByBranches(
    branches: number[],
  ): Promise<IProductionCategoryDiverseListByBranches[]> {
    const category = await this.table.findMany({
      select: {
        id: true,
        nome: true,
        items: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
      where: {
        id_filial: {
          in: branches,
        },
      },
    })

    return category
  }
}
