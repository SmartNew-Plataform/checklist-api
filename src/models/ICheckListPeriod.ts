export interface IAction {
  id: number
  id_grupo: number | null
  descricao: string | null
  responsavel: string | null
  descricao_acao: string | null
  id_registro_producao: number
  id_item: number
  data_inicio: Date | null
  data_fim: Date | null
  data_fechamento: Date | null
  img: {
    img: string
    name: string
    path: string
  }[]
  productionRegister: {
    equipment: {
      ID: number
    } | null
  }
}

export interface IInfoByLogin {
  id: number
  id_filial: number | null
  id_registro_producao: number | null
  id_item_checklist: number | null
  status_item: number | null
  status_item_nc: number | null
  log_date: Date | null
}
