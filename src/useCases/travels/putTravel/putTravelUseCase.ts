import CustomError from '@/config/CustomError'
import IUseCase from '@/models/IUseCase'
import { travelsData } from '../test/staticData'
import IPutTravelRequestDTO from './IPutTravelRequestDTO'

export default class PutTravelUseCase implements IUseCase {
  async execute(data: IPutTravelRequestDTO) {
    const travel = travelsData.find((item) => item.id === data.id)
    if (!travel) throw new CustomError('Viagem não encontrada', 404)

    travel.currentLocation = data.currentLocation
    travel.date = data.date
    travel.destination = data.destination
    travel.distanceTraveled = data.distanceTraveled
    travel.pauses = data.pauses
    travel.startLocation = data.startLocation
    travel.status = data.status

    return travel
  }
}
