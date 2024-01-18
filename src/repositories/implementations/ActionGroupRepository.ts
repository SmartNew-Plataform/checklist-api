import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import IActionGroupRepository from '../IActionGroupRepository'

export default class ActionGroupRepository implements IActionGroupRepository {
  private table = prisma.smartnewsystem_producao_checklist_acao_grupo

  async listByClient(clientId: number) {
    return await this.table.findMany({
      where: {
        id_cliente: clientId,
      },
    })
  }

  async listByEquipment(equipmentId: number) {
    return await this.table.findMany({
      where: {
        productionRegister: {
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

  async findById(id: number) {
    const found = await this.table.findUnique({
      select: {
        id: true,
        id_cliente: true,
        numero: true,
        titulo: true,
        id_registro_producao: true,
        descricao: true,
        descricao_acao: true,
        responsavel: true,
        data_concluida: true,
        data_fim: true,
        data_inicio: true,
        log_date: true,
        productionRegister: {
          select: {
            id_equipamento: true,
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
