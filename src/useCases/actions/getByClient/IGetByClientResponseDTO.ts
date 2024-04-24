export default interface IGetByClientResponseDTO {
  id: number
  id_grupo: number | null
  // id_registro_producao: number
  id_checklist: number | null
  id_item: number
  descricao: string | null
  responsavel: string | null
  data_inicio: Date | null
  data_fim: Date | null
  data_fechamento: Date | null
  descricao_acao: string | null
  log_date: Date
  img: {
    name: string
    url: string
    path: string
  }[]
}
