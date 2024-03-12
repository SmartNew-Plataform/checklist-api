import { prisma } from '@/lib/prisma'
import { IFindByClient } from '../../models/ICheckList'
import ICheckListRepository from '../ICheckListRepository'

export default class CheckListRepository implements ICheckListRepository {
  private table = prisma.smartnewsystem_producao_checklist

  async findByClient(clientId: number): Promise<IFindByClient[]> {
    return await this.table.findMany({
      select: {
        id: true,
        id_familia: true,
        descricao: true,
        id_localizacao: true,
      },
      where: {
        familyEquipment: {
          ID_cliente: clientId,
        },
      },
    })
  }
}
