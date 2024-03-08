import { prisma } from '@/lib/prisma'
import { ICheckListXModel } from '@/models/ICheckListXModel'
import ICheckListXModelRepository from '../ICheckListXModelRepository'

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
}
