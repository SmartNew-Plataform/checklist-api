import IUseCase from '../../../models/IUseCase'
import ICheckListStatusRepository from '../../../repositories/ICheckListStatusRepository'
import IGetStatusRequestDTO from './IGetStatusRequestDTO'

export default class GetStatusUseCase implements IUseCase {
  constructor(private checkListStatusRepository: ICheckListStatusRepository) {}

  async execute(data: IGetStatusRequestDTO) {
    const allCheckListStatus = await this.checkListStatusRepository.info(
      data.user.id_cliente || 0,
    )

    return {
      checkListStatus: allCheckListStatus.map((item) => ({
        id: item.id,
        description: item.descricao || '',
        controlId: item.id_controle,
        icon: item.icone || '',
        color: item.cor || '',
      })),
    }
  }
}
