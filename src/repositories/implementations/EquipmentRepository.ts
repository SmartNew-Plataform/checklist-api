import { prisma } from '@/lib/prisma'
import IEquipmentRepository from '../IEquipmentRepository'
import {
  IFindById,
  IListByBranch,
  IListFamilyByBranch,
} from '../../models/IEquipment'

export default class EquipmentRepository implements IEquipmentRepository {
  private table = prisma.cadastro_de_equipamentos

  async listByBranch(branch: number[]): Promise<IListByBranch[]> {
    return await this.table.findMany({
      select: {
        ID: true,
        equipamento_codigo: true,
        descricao: true,
        ID_cliente: true,
        ID_filial: true,
        id_centro_custo: true,
        ID_familia: true,
        registerEquipment: {
          select: {
            horimetro: true,
            quilometragem: true,
          },
        },
        registerEquipmentAction: {
          select: {
            turno: true,
            horimetro: true,
            quilometragem: true,
          },
        },
      },
      where: {
        ID_filial: {
          in: branch,
        },
      },
    })
  }

  async findById(id: number): Promise<IFindById | null> {
    const equipment = await this.table.findUnique({
      include: {
        cadastro_de_familias_de_equipamento: true,
      },
      where: {
        ID: id,
      },
    })

    return equipment
  }

  async listFamilyByBranch(branch: number[]): Promise<IListFamilyByBranch[]> {
    const family = await this.table.findMany({
      distinct: 'ID_familia',
      select: {
        ID_familia: true,
      },
      where: {
        ID_filial: {
          in: branch,
        },
      },
    })

    return family
  }
}
