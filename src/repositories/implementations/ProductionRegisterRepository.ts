import { prisma } from '@/lib/prisma'
import { Prisma, smartnewsystem_registro_producao } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import {
  IListByEquipment,
  IListRegisterByTime,
} from '../../models/IProductionRegister'
import IProductionRegisterRepository from '../IProductionRegisterRepository'

export default class ProductionRegisterRepository
  implements IProductionRegisterRepository
{
  private table = prisma.smartnewsystem_registro_producao

  async listByEquipment(
    equipmentId: number | null,
    startDate: Date,
    endDate: Date,
    branch: number[],
  ): Promise<IListByEquipment[]> {
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
      include: {
        checkListPeriod: true,
        equipment: {
          include: {
            familyEquipment: true,
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
  ): Promise<IListByEquipment[]> {
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

  async listRegisterByTime(
    time: Date,
    branch: number[],
    login: string,
    fromDate: Date,
  ): Promise<IListRegisterByTime[]> {
    const register = await this.table.findMany({
      select: {
        id: true,
        DATA: true,
        turno: true,
        status: true,
        id_turno: true,
        id_centro_custo: true,
        data_hora_encerramento: true,
        data_log: true,
        equipment: {
          select: {
            ID: true,
            equipamento_codigo: true,
            descricao: true,
          },
        },
        quilometragem: true,
        quilometragem_final: true,
        data_hora_inicio: true,
        login: true,
      },
      where: {
        data_hora_inicio: {
          gte: fromDate,
        },
        equipment: {
          ID_filial: {
            in: branch,
          },
        },
        login,
      },
    })

    return register
  }

  async listRegisterByBranch(branch: number[]): Promise<IListRegisterByTime[]> {
    const register = await this.table.findMany({
      select: {
        id: true,
        DATA: true,
        turno: true,
        status: true,
        id_turno: true,
        id_centro_custo: true,
        data_hora_encerramento: true,
        data_log: true,
        equipment: {
          select: {
            ID: true,
            equipamento_codigo: true,
            descricao: true,
          },
        },
        quilometragem: true,
        quilometragem_final: true,
        data_hora_inicio: true,
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

  async findLastMileageByEquipment(
    equipmentId: number,
  ): Promise<number | Decimal> {
    const mileage = await this.table.aggregate({
      _max: {
        quilometragem_final: true,
      },
      where: {
        id_equipamento: equipmentId,
      },
    })
    return mileage._max.quilometragem_final || 0
  }

  async save(
    data: Prisma.smartnewsystem_registro_producaoUncheckedCreateInput,
  ): Promise<smartnewsystem_registro_producao> {
    const register = await this.table.create({
      data,
    })

    return register
  }

  async update(
    id: number,
    data: Prisma.smartnewsystem_registro_producaoUpdateInput,
  ): Promise<void> {
    await this.table.update({
      data,
      where: {
        id,
      },
    })
  }
}
