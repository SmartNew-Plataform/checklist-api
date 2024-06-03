export interface ILocation {
  listByBranch: {
    id: number
    tag: string | null
    localizacao: string | null
    id_filial: number
  }
  findById: {
    id: number
    id_filial: number
    tag: string | null
    localizacao: string | null
  }
}
