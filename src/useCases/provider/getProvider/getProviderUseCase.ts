import IUseCase from '@/models/IUseCase'
import IGetProviderRequestDTO from './IGetProviderRequestDTO'
import IProviderRepository from '@/repositories/IProviderRepository'

export default class GetProviderUseCase implements IUseCase {
  constructor(private providerRepository: IProviderRepository) {}
  async execute(data: IGetProviderRequestDTO) {
    const allProviders = await this.providerRepository.listByClient(
      data.user.id_cliente || 0,
    )

    const response = allProviders.map((item) => {
      return {
        id: item.ID,
        cnpj: item.cnpj,
        name: item.nome_fantasia,
      }
    })

    return { providers: response }
  }
}
