import { prisma } from '@/lib/prisma'
import { ISmartCheckList } from '@/models/ISmartCheckList'
import { Prisma, smartnewsystem_checklist } from '@prisma/client'
import ISmartCheckListRepository from '../ISmartCheckListRepository'

export default class SmartCheckListRepository
  implements ISmartCheckListRepository
{
  private table = prisma.smartnewsystem_checklist

  async listByEquipment(
    equipmentId: number | null,
    startDate: Date,
    endDate: Date,
    branch: number[],
  ): Promise<ISmartCheckList['listByEquipment'][]> {
    const haveEquipment = equipmentId
      ? {
          id_equipamento: equipmentId,
        }
      : {
          equipment: {
            ID_filial: {
              in: branch,
            },
          },
        }

    const productionRegister = await this.table.findMany({
      select: {
        checkListPeriod: {
          select: {
            status_item: true,
          },
        },
        equipment: {
          select: {
            ID: true,
            descricao: true,
            equipamento_codigo: true,
            ID_familia: true,
            familyEquipment: {
              select: {
                ID: true,
                familia: true,
              },
            },
          },
        },
      },
      where: {
        ...haveEquipment,
        data_hora_inicio: {
          gte: startDate,
          lte: endDate,
        },
      },
    })

    return productionRegister
  }

  async listByBranch(
    startDate: Date,
    endDate: Date,
    branch: number[],
  ): Promise<ISmartCheckList['listByBranch'][]> {
    const productionRegister = await this.table.findMany({
      include: {
        checkListPeriod: true,
        equipment: {
          include: {
            familyEquipment: true,
          },
        },
      },
      where: {
        equipment: {
          ID_filial: {
            in: branch,
          },
        },
        data_hora_inicio: {
          gte: startDate,
          lte: endDate,
        },
      },
    })

    return productionRegister
  }

  async listChecklistByTime(
    branch: number[],
    login: string,
    fromDate: Date,
  ): Promise<ISmartCheckList['listChecklistByTime'][]> {
    const register = await this.table.findMany({
      select: {
        id: true,
        status: true,
        id_turno: true,
        data_hora_encerramento: true,
        location: {
          select: {
            id: true,
            id_filial: true,
            localizacao: true,
          },
        },
        equipment: {
          select: {
            ID: true,
            equipamento_codigo: true,
            descricao: true,
          },
        },
        data_hora_inicio: true,
        login: true,
        log_date: true,
      },
      where: {
        data_hora_inicio: {
          gte: fromDate,
        },
        login,
        OR: [
          {
            equipment: {
              ID_filial: {
                in: branch,
              },
            },
          },
          {
            location: {
              id_filial: {
                in: branch,
              },
            },
          },
        ],
      },
    })

    return register
  }

  async listRegisterByBranch(
    branch: number[],
  ): Promise<ISmartCheckList['listRegisterByBranch'][]> {
    const register = await this.table.findMany({
      select: {
        id: true,
        status: true,
        id_turno: true,
        data_hora_encerramento: true,
        equipment: {
          select: {
            ID: true,
            equipamento_codigo: true,
            descricao: true,
          },
        },
        data_hora_inicio: true,
        log_date: true,
        login: true,
      },
      where: {
        equipment: {
          ID_filial: {
            in: branch,
          },
        },
      },
    })

    return register
  }

  async save(
    data: Prisma.smartnewsystem_checklistUncheckedCreateInput,
  ): Promise<smartnewsystem_checklist> {
    const register = await this.table.create({
      data,
    })

    return register
  }

  async update(
    id: number,
    data: Prisma.smartnewsystem_checklistUpdateInput,
  ): Promise<void> {
    await this.table.update({
      data,
      where: {
        id,
      },
    })
  }
}
