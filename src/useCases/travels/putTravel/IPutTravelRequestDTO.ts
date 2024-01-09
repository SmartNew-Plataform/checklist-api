import { IUser } from '@/models/IUser'

export default interface IPutTravelRequestDTO {
  user: IUser
  id: number

  status: 'due' | 'progress' | 'paused' | 'stopped' | 'finished'
  date: Date
  destination: string
  startLocation: string | null
  pauses: {
    started: Date
    ended: Date | null
    pausedLocation: string
    resumedLocation: string | null
  }[]
  distanceTraveled: number
  currentLocation: string | null
}
