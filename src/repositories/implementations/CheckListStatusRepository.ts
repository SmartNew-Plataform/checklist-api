import { prisma } from '@/lib/prisma'
import { IFindByClient, IInfo } from '../../models/ICheckListStatus'
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
        acao: true,
        id_controle: true,
        cor: true,
        icone: true,
      },
      where: {
        id_cliente: clientId,
      },
    })
  }

  async findByClient(clientId: number): Promise<IFindByClient[]> {
    const checkListStatus = await this.table.findMany({
      select: {
        id: true,
        descricao: true,
        icone: true,
        cor: true,
      },
      where: {
        id_cliente: clientId,
      },
    })

    return checkListStatus
  }
}
