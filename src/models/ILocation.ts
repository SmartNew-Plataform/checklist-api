export interface ILocation {
  listByBranch: {
    id: number
    localizacao: string | null
    id_filial: number
  }
  findById: {
    id: number
    id_filial: number
    localizacao: string | null
  }
}
