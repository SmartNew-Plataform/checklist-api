import { IByClient } from '../models/IPeriod'
import { smartnewsystem_registro_turno } from '@prisma/client'

export default interface IPeriodRepository {
  byClient(clientId: number): Promise<IByClient[]>
  findById(id: number): Promise<smartnewsystem_registro_turno | null>
  byBranch(branchId: number): Promise<smartnewsystem_registro_turno[]>
}
