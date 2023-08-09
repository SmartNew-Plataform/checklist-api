import { smartnewsystem_registro_producao_turno } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

export interface IListRegisterByTime {
  id: number
  DATA: Date | null
  status: number
  turno: smartnewsystem_registro_producao_turno | null
  id_turno: number | null
  id_centro_custo: number | null
  data_hora_encerramento: Date | null
  data_log: Date | null
  equipment: {
    ID: number
    equipamento_codigo: string | null
    descricao: string | null
  } | null
  quilometragem: Decimal | null
  quilometragem_final: Decimal | null
  data_hora_inicio: Date | null
  login: string | null
}
