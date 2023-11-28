export default interface IGetInfoByLoginResponseDTO {
  id: number
  branchId: number
  productionRegisterId: number
  checkListItemId: number
  img: {
    url: string
    path: string
  }[]
  statusItem: number | null
  statusNC: number | null
  actions: {
    id: number
    title: string
    responsible: string
    description: string | null
    checklistId: number
    checklistPeriodId: number
    startDate: Date | null
    dueDate: Date | null
    endDate: Date | null
    equipment: {
      id: number
      clientId: number | null
      branchId: number | null
      familyId: number | null
      costCenter: string | null
      code: string | null
      description: string | null
    }
  }[]
  logDate: Date | null
}
