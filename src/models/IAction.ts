export interface IAction {
  listByGroup: {
    id: number
    id_grupo: number | null
    id_checklist: number | null
    id_item: number
    descricao: string | null
    descricao_acao: string | null
    responsavel: string | null
    data_fechamento: Date | null
    data_fim: Date | null
    data_inicio: Date | null
    log_date: Date
    checklist: {
      id_equipamento: number | null
      id_localizacao: number | null
    } | null
  }
  findById: {
    id: number
    id_grupo: number | null
    id_checklist: number | null
    id_item: number
    descricao: string | null
    descricao_acao: string | null
    responsavel: string | null
    data_fechamento: Date | null
    data_fim: Date | null
    data_inicio: Date | null
    log_date: Date
    checklist: {
      id_equipamento: number | null
      id_localizacao: number | null
    } | null
  }
}
