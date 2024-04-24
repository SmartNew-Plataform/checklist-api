import { IUser } from '../../../models/IUser'

export default interface IPostSyncCheckListRequestDTO {
  user: IUser
  checkListSchema: {
    inserted: {
      _id: string
      id: number
      date: Date
      code: string
      description: string
      status: 'open' | 'close'
      equipmentId: number
      mileage: number
      finalMileage: number
      initialTime: Date
      finalTime: string | Date | null
      login: string
      periodId: number
    }[]
    updated: {
      id: number
      date: Date
      period: string
      code: string
      description: string
      status: 'open' | 'close'
      equipmentId: number
      mileage: number
      finalMileage: number
      initialTime: Date
      finalTime: string | Date | null
      login: string
      periodId: number
    }[]
  }

  checkListPeriod: {
    inserted: {
      _id: string
      id: number
      branchId: number
      productionRegisterId: string
      checkListItemId: number
      statusItem: number
      statusNC: number | null
      observation: string | null
      logDate: Date
    }[]

    updated: {
      id: number
      branchId: number
      productionRegisterId: number
      checkListItemId: number
      statusItem: number
      statusNC: number | null
      observation: string | null
      logDate: Date
    }[]
  }
}
