import { prisma } from '@/lib/prisma'
import { Prisma, smartnewsystem_registro_equipamento } from '@prisma/client'
import IEquipmentRegisterRepository from '../IEquipmentRegisterRepository'

export default class EquipmentRegisterRepository
  implements IEquipmentRegisterRepository
{
  private table = prisma.smartnewsystem_registro_equipamento

  async create(
    data: Prisma.smartnewsystem_registro_equipamentoUncheckedCreateInput,
  ): Promise<smartnewsystem_registro_equipamento> {
    const registerEquipment = await this.table.create({
      data,
    })

    return registerEquipment
  }

  async findByEquipment(
    equipmentId: number,
  ): Promise<smartnewsystem_registro_equipamento | null> {
    const registerEquipment = await this.table.findFirst({
      where: {
        id_equipamento: equipmentId,
      },
    })

    return registerEquipment
  }

  async update(
    id: number,
    data: Prisma.smartnewsystem_registro_equipamentoUncheckedUpdateInput,
  ): Promise<smartnewsystem_registro_equipamento> {
    const registerEquipment = await this.table.update({
      data,
      where: {
        id,
      },
    })

    return registerEquipment
  }
}
