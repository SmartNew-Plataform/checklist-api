export default interface IGetInfoByLoginResponseDTO {
  id: number
  branchId: number
  productionRegisterId: number
  checkListItemId: number
  img: {
    file: string
    base64: string
  }[]
  statusItem: number | null
  statusNC: number | null
  logDate: Date | null
}
