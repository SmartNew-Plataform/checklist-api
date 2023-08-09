import IUseCase from '../../../models/IUseCase'
import IProductionRegisterRepository from '../../../repositories/IProductionRegisterRepository'
import IPatchCloseCheckListRequestDTO from './IPatchCloseCheckListRequestDTO'
import IPatchCloseCheckListResponseDTO from './IPatchCloseCheckListResponseDTO'

export default class PatchCloseCheckListUseCase implements IUseCase {
  constructor(
    private productionRegisterRepository: IProductionRegisterRepository,
  ) {}

  async execute(data: IPatchCloseCheckListRequestDTO) {
    await this.productionRegisterRepository.update(data.productionRegisterId, {
      status: 0,
    })

    const response: IPatchCloseCheckListResponseDTO = {
      updated: true,
    }

    return response
  }
}
