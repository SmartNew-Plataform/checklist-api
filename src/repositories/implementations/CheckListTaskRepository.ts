import { prisma } from '@/lib/prisma'
import { IByClient } from '../../models/ICheckListTask'
import ICheckListTaskRepository from '../ICheckListTaskRepository'

export default class CheckListTaskRepository
  implements ICheckListTaskRepository
{
  private table = prisma.smartnewsystem_producao_checklist_tarefas

  async byClient(clientId: number): Promise<IByClient[]> {
    return this.table.findMany({
      select: {
        id: true,
        descricao: true,
      },
      where: {
        id_cliente: clientId,
      },
    })
  }
}
