import { prisma } from '@/lib/prisma'
import { ICheckListXModel } from '@/models/ICheckListXModel'
import ICheckListXModelRepository from '../ICheckListXModelRepository'
import { Prisma, smartnewsystem_checklist_x_modelo } from '@prisma/client'

export default class CheckListXModelRepository
  implements ICheckListXModelRepository
{
  private table = prisma.smartnewsystem_checklist_x_modelo

  async listByCheckList(
    checklistId: number,
  ): Promise<ICheckListXModel['listByCheckList'][]> {
    const model = await this.table.findMany({
      select: {
        id: true,
        model: {
          select: {
            id: true,
            checkListItens: {
              select: {
                id: true,
                checkListTask: {
                  select: {
                    id: true,
                    descricao: true,
                  },
                },
              },
            },
          },
        },
      },
      where: {
        id_checklist: checklistId,
      },
    })

    return model
  }

  async insert(
    data: Prisma.smartnewsystem_checklist_x_modeloUncheckedCreateInput,
  ): Promise<smartnewsystem_checklist_x_modelo> {
    const model = await this.table.create({
      data,
    })

    return model
  }
}
