import { prisma } from '@/lib/prisma'
import { IInfo } from '../../models/ICheckListStatusAction'
import { smartnewsystem_producao_checklist_status_acao } from '@prisma/client'
import ICheckListStatusActionRepository from '../ICheckListStatusActionRepository'

export default class CheckListStatusActionRepository
  implements ICheckListStatusActionRepository
{
  private table = prisma.smartnewsystem_producao_checklist_status_acao

  async findByTaskAndStatus(
    taskId: number,
    statusId: number,
  ): Promise<smartnewsystem_producao_checklist_status_acao[]> {
    return await this.table.findMany({
      where: {
        id_tarefa: taskId,
        id_status: statusId,
      },
    })
  }

  async info(clientId: number): Promise<IInfo[]> {
    const checkListStatusAction = await this.table.findMany({
      where: {
        checkListTask: {
          id_cliente: clientId,
        },
      },
    })

    return checkListStatusAction.map((item) => {
      return {
        id: item.id,
        taskId: item.id_tarefa || 0,
        statusId: item.id_status || 0,
        controlId: item.id_controle,
        description: item.descricao || '',
        impeding: item.impeditivo || false,
        logUser: item.log_user || '',
        logDate: item.log_date || new Date(),
      }
    })
  }
}
