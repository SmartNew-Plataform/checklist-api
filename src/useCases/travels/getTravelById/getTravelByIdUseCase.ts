import CustomError from '@/config/CustomError'
import IUseCase from '@/models/IUseCase'
import { travelsData } from '../test/staticData'
import IGetTravelByIdRequestDTO from './IGetTravelByIdRequestDTO'

export default class GetTravelByIdUseCase implements IUseCase {
  async execute(data: IGetTravelByIdRequestDTO) {
    const response = travelsData.find((item) => item.id === data.id)
    if (!response) throw new CustomError('Viagem não encontrada', 404)

    return response
  }
}
