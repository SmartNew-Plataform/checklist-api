import { IInfo } from '../models/ICheckListStatusAction'
import { smartnewsystem_producao_checklist_status_acao } from '@prisma/client'

export default interface ICheckListStatusActionRepository {
  findByTaskAndStatus(
    taskId: number,
    statusId: number,
  ): Promise<smartnewsystem_producao_checklist_status_acao[]>
  info(clientId: number): Promise<IInfo[]>
}
