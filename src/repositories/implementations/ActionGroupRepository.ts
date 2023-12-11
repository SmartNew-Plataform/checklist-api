import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import IActionGroupRepository from '../IActionGroupRepository'

export default class ActionGroupRepository implements IActionGroupRepository {
  private table = prisma.smartnewsystem_producao_checklist_acao_grupo

  async create(
    data: Prisma.smartnewsystem_producao_checklist_acao_grupoUncheckedCreateInput,
  ) {
    return await this.table.create({
      data,
    })
  }
}
