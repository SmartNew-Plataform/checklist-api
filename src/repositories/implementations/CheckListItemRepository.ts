import { prisma } from '@/lib/prisma'
import { IFindTaskByFamily, IInfo } from '../../models/ICheckListItem'
import ICheckListItemRepository from '../ICheckListItemRepository'

export default class CheckListItemRepository
  implements ICheckListItemRepository
{
  private table = prisma.smartnewsystem_producao_checklist_itens

  async findTaskByFamily(familyId: number): Promise<IFindTaskByFamily[]> {
    return await this.table.findMany({
      select: {
        id: true,
        checkList: {
          select: {
            id_familia: true,
          },
        },
        checkListTask: {
          select: {
            id: true,
            descricao: true,
          },
        },
      },
      where: {
        checkList: {
          id_familia: familyId,
        },
      },
    })
  }

  async info(clientId: number): Promise<IInfo[]> {
    return await this.table.findMany({
      select: {
        id: true,
        id_checklist: true,
        id_tarefa: true,
        id_controle: true,
      },
      where: {
        checkList: {
          familyEquipment: {
            ID_cliente: clientId,
          },
        },
      },
    })
  }
}
