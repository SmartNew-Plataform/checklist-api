import { prisma } from '@/lib/prisma'
import {
  ICountByBranch,
  IFindByClient,
  IInfo,
  IListByEquipmentAndDate,
} from '../../models/ICheckListStatus'
import ICheckListStatusRepository from '../ICheckListStatusRepository'

export default class CheckListStatusRepository
  implements ICheckListStatusRepository
{
  private table = prisma.smartnewsystem_producao_checklist_status

  async listByEquipmentAndDate(
    equipmentId: number[],
    startDate: Date,
    endDate: Date,
  ): Promise<IListByEquipmentAndDate[]> {
    const status = await this.table.findMany({
      select: {
        id: true,
        descricao: true,
        acao: true,
        icone: true,
        cor: true,
        checklistPeriod: {
          select: {
            id: true,
            productionRegister: {
              select: {
                id: true,
                equipment: {
                  select: {
                    familyEquipment: {
                      select: {
                        ID: true,
                        familia: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      where: {
        checklistPeriod: {
          some: {
            log_date: {
              gte: startDate,
              lte: endDate,
            },
            productionRegister: {
              equipment: {
                ID: {
                  in: equipmentId,
                },
              },
            },
          },
        },
      },
    })

    return status
  }

  async countByBranch(
    branches: number[],
    startDate: Date,
    endDate: Date,
  ): Promise<ICountByBranch[]> {
    const status = await this.table.findMany({
      select: {
        id: true,
        descricao: true,
        acao: true,
        icone: true,
        cor: true,
        checklistPeriod: {
          select: {
            id: true,
            productionRegister: {
              select: {
                id: true,
                equipment: {
                  select: {
                    familyEquipment: {
                      select: {
                        ID: true,
                        familia: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      where: {
        checklistPeriod: {
          some: {
            log_date: {
              gte: startDate,
              lte: endDate,
            },
            productionRegister: {
              equipment: {
                branch: {
                  ID: {
                    in: branches,
                  },
                },
              },
            },
          },
        },
      },
    })

    return status
  }

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
