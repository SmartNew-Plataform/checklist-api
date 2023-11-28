import IUseCase from '@/models/IUseCase'
import UserRepository from '@/repositories/implementations/UserRepository'
import IGetResponsiblesRequestDTO from './IGetResponsiblesRequestDTO'

export default class GetResponsiblesUseCase implements IUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: IGetResponsiblesRequestDTO) {
    const usersByClient = await this.userRepository.listByClient(
      data.user.id_cliente || 0,
    )

    return usersByClient
  }
}
