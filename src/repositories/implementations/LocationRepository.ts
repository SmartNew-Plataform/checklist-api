import { prisma } from '@/lib/prisma'
import { ILocation } from '@/models/ILocation'
import ILocationRepository from '../ILocationRepository'

export default class LocationRepository implements ILocationRepository {
  private table = prisma.sofman_cad_localizacoes

  async listByBranch(branchId: number[]): Promise<ILocation['listByBranch'][]> {
    const location = await this.table.findMany({
      select: {
        id: true,
        id_filial: true,
        localizacao: true,
      },
      where: {
        id_filial: {
          in: branchId,
        },
      },
    })

    return location
  }

  async findById(id: number): Promise<ILocation['findById'] | null> {
    const location = await this.table.findUnique({
      select: {
        id: true,
        id_filial: true,
        localizacao: true,
      },
      where: {
        id,
      },
    })

    return location
  }
}
