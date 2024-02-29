export default interface IGetInfoResponseDTO {
  id: number
  costCenterId: number
  equipmentId: number
  periodId: number | null
  initialMileage: number | null
  finalMileage: number | null
  login: string
  date: Date
  initialTime: Date
  finalTime: Date | null
  status: 'open' | 'close'
  dataLog: Date | null
  code: string
  description: string
}
