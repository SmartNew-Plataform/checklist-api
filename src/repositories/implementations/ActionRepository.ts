import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import IActionRepository from '../IActionRepository'

export default class ActionRepository implements IActionRepository {
  private table = prisma.smartnewsystem_producao_checklist_acao

  async findById(id: number) {
    const found = await this.table.findUnique({
      where: {
        id,
      },
    })

    return found
  }

  async create(
    data: Prisma.smartnewsystem_producao_checklist_acaoUncheckedCreateInput,
  ) {
    await this.table.create({ data })
  }

  async update(
    id: number,
    data: Prisma.smartnewsystem_producao_checklist_acaoUpdateInput,
  ) {
    await this.table.update({
      data,
      where: {
        id,
      },
    })
  }
}
