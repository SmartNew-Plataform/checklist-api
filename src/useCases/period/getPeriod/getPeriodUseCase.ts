import IUseCase from '../../../models/IUseCase'
import IGetPeriodRequestDTO from './IGetPeriodRequestDTO'
import IPeriodRepository from '../../../repositories/IPeriodRepository'
import IGetPeriodResponseDTO from './IGetPeriodResponseDTO'

export default class GetPeriodUseCase implements IUseCase {
  constructor(private periodRepository: IPeriodRepository) {}

  async execute(data: IGetPeriodRequestDTO) {
    const allPeriod = await this.periodRepository.byClient(
      data.user.id_cliente || 0,
    )

    const response: IGetPeriodResponseDTO[] = allPeriod.map((item) => {
      return {
        id: item.id,
        period: item.turno,
        clientId: item.id_cliente,
        branchId: item.id_filial,
      }
    })

    return response
  }
}
