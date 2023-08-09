import { prisma } from '@/lib/prisma'
import IPeriodRepository from '../IPeriodRepository'
import { IByClient } from '../../models/IPeriod'
import { smartnewsystem_registro_turno } from '@prisma/client'

export default class PeriodRepository implements IPeriodRepository {
  private table = prisma.smartnewsystem_registro_turno

  async byClient(clientId: number): Promise<IByClient[]> {
    return await this.table.findMany({
      where: {
        id_cliente: clientId,
      },
    })
  }

  async findById(id: number): Promise<smartnewsystem_registro_turno | null> {
    return await this.table.findUnique({
      where: {
        id,
      },
    })
  }

  async byBranch(branchId: number): Promise<smartnewsystem_registro_turno[]> {
    return await this.table.findMany({
      where: {
        id_filial: branchId,
      },
    })
  }
}
