export interface ICheckListXModel {
  listByCheckList: {
    id: number
    model: {
      id: number
      checkListItens: {
        id: number
        checkListTask: {
          id: number
          descricao: string | null
        } | null
      }[]
    }
  }
}
