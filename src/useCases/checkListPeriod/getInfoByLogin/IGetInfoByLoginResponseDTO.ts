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
  logDate: Date | null
}
