import IUseCase from '@/models/IUseCase'
import { travelsData } from '../test/staticData'
import IGetByLoginRequestDTO from './IGetByLoginRequestDTO'

export default class GetByLoginUseCase implements IUseCase {
  async execute(data: IGetByLoginRequestDTO) {
    const response = travelsData.filter((item) => item.user === data.user.login)
    return response
  }
}
