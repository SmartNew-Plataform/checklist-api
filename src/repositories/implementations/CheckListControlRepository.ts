import { prisma } from '@/lib/prisma'
import { IInfo } from '../models/ICheckListControl'

export default class CheckListControlRepository {
  private table = prisma.smartnewsystem_producao_checklist_controle

  async info(): Promise<IInfo[]> {
    return await this.table.findMany()
  }
}
