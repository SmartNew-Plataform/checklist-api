import { IListByBranch, IListFamilyByBranch } from '../models/IEquipment'
import { cadastro_de_equipamentos } from '@prisma/client'

export default interface IEquipmentRepository {
  listByBranch(branch: number[]): Promise<IListByBranch[]>
  listFamilyByBranch(branch: number[]): Promise<IListFamilyByBranch[]>
  findById(id: number): Promise<cadastro_de_equipamentos | null>
}
