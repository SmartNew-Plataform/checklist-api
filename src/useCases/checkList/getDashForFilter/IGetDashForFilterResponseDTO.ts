export default interface IGetDashForFilterResponseDTO {
  summaryCards: Array<{
    id: number
    description: string
    icon: string
    color: string
    quantity: number
  }>

  family: {
    id: number
    name: string
    quantity: number
    status: {
      id: number
      name: string
      count: number
    }[]
  }[]

  status:
    | {
        [key: string]: number
      }[]
}
