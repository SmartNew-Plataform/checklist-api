import { prisma } from '@/lib/prisma'
import { IInfoByLogin } from '../../models/ICheckListPeriod'
import ICheckListPeriodRepository from '../ICheckListPeriodRepository'
import { Prisma, smartnewsystem_producao_checklist_turno } from '@prisma/client'

export default class CheckListPeriodRepository
  implements ICheckListPeriodRepository
{
  private table = prisma.smartnewsystem_producao_checklist_turno

  async infoByLogin(login: string): Promise<IInfoByLogin[]> {
    return await this.table.findMany({
      select: {
        id: true,
        id_filial: true,
        id_registro_producao: true,
        id_item_checklist: true,
        status_item: true,
        status_item_nc: true,
        log_date: true,
      },
      where: {
        productionRegister: {
          login,
        },
      },
    })
  }

  async create(
    data: Prisma.smartnewsystem_producao_checklist_turnoUncheckedCreateInput,
  ): Promise<smartnewsystem_producao_checklist_turno> {
    return await this.table.create({
      data,
    })
  }

  async update(
    id: number,
    data: Prisma.smartnewsystem_producao_checklist_turnoUpdateInput,
  ): Promise<smartnewsystem_producao_checklist_turno> {
    return await this.table.update({
      data,
      where: {
        id,
      },
    })
  }
}
