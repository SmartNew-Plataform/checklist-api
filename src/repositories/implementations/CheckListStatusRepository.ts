import { prisma } from '@/lib/prisma'
import { IInfo } from '../../models/ICheckListStatus'
import ICheckListStatusRepository from '../ICheckListStatusRepository'

export default class CheckListStatusRepository
  implements ICheckListStatusRepository
{
  private table = prisma.smartnewsystem_producao_checklist_status

  async info(clientId: number): Promise<IInfo[]> {
    return await this.table.findMany({
      select: {
        id: true,
        id_cliente: true,
        descricao: true,
        id_controle: true,
        cor: true,
        icone: true,
      },
      where: {
        id_cliente: clientId,
      },
    })
  }
}
