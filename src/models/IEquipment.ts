import {
  cadastro_de_equipamentos,
  cadastro_de_familias_de_equipamento,
} from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

export interface IFindById extends cadastro_de_equipamentos {
  cadastro_de_familias_de_equipamento: cadastro_de_familias_de_equipamento | null
}

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
  registerEquipmentAction: {
    turno: boolean
    horimetro: boolean
    quilometragem: boolean
  } | null
}

export interface IListFamilyByBranch {
  ID_familia: number | null
}
