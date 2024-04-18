export interface IActionGroup {
  listByClient: {
    id: number
    id_cliente: number
    id_registro_producao: number | null
    id_checklist: number | null
    numero: number
    titulo: string | null
    responsavel: string
    descricao: string
    data_inicio: Date
    data_fim: Date
    data_concluida: Date | null
    descricao_acao: string | null
    log_date: Date
  }
  listByEquipment: {
    id: number
    id_cliente: number
    id_registro_producao: number | null
    id_checklist: number | null
    numero: number
    titulo: string | null
    responsavel: string
    descricao: string
    data_inicio: Date
    data_fim: Date
    data_concluida: Date | null
    descricao_acao: string | null
    log_date: Date
  }
  findById: {
    id: number
    id_cliente: number
    numero: number
    titulo: string | null
    id_checklist: number | null
    descricao: string
    descricao_acao: string | null
    responsavel: string
    data_concluida: Date | null
    data_fim: Date
    data_inicio: Date
    log_date: Date
    checklist: {
      id_equipamento: number | null
      id_localizacao: number | null
    } | null
  }
}
