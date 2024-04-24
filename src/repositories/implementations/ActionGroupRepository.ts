import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import IActionGroupRepository from '../IActionGroupRepository'
import { IActionGroup } from '@/models/IActionGroup'

export default class ActionGroupRepository implements IActionGroupRepository {
  private table = prisma.smartnewsystem_producao_checklist_acao_grupo

  async listByClient(
    clientId: number,
  ): Promise<IActionGroup['listByClient'][]> {
    const actionGroup = await this.table.findMany({
      where: {
        id_cliente: clientId,
      },
    })

    return actionGroup
  }

  async listByEquipment(
    equipmentId: number,
  ): Promise<IActionGroup['listByEquipment'][]> {
    return await this.table.findMany({
      where: {
        checklist: {
          id_equipamento: equipmentId,
        },
      },
    })
  }

  async create(
    data: Prisma.smartnewsystem_producao_checklist_acao_grupoUncheckedCreateInput,
  ) {
    return await this.table.create({
      data,
    })
  }

  async findById(id: number): Promise<IActionGroup['findById'] | null> {
    const found = await this.table.findUnique({
      select: {
        id: true,
        id_cliente: true,
        numero: true,
        titulo: true,
        // id_registro_producao: true,
        id_checklist: true,
        descricao: true,
        descricao_acao: true,
        responsavel: true,
        data_concluida: true,
        data_fim: true,
        data_inicio: true,
        log_date: true,
        checklist: {
          select: {
            id_equipamento: true,
            id_localizacao: true,
          },
        },
      },
      where: {
        id,
      },
    })

    return found
  }

  async update(
    id: number,
    data: Prisma.smartnewsystem_producao_checklist_acao_grupoUncheckedUpdateInput,
  ) {
    return await this.table.update({
      data,
      where: {
        id,
      },
    })
  }
}
