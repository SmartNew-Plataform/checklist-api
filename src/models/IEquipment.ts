import { Decimal } from '@prisma/client/runtime/library'

export interface IListByBranch {
  ID: number
  equipamento_codigo: string | null
  descricao: string | null
  ID_cliente: number | null
  ID_filial: number | null
  ID_familia: number | null
  id_centro_custo: number | null
  registerEquipment: {
    horimetro: Decimal | null
    quilometragem: Decimal | null
  } | null
}

export interface IListFamilyByBranch {
  ID_familia: number | null
}
