import IUseCase from '@/models/IUseCase'
import ICheckListStatusActionRepository from '@/repositories/ICheckListStatusActionRepository'
import IGetInfoStatusActionRequestDTO from './IGetInfoStatusActionRequestDTO'

export default class GetInfoStatusActionUseCase implements IUseCase {
  constructor(
    private checkListStatusActionRepository: ICheckListStatusActionRepository,
  ) {}

  async execute(data: IGetInfoStatusActionRequestDTO) {
    const allStatusAction = await this.checkListStatusActionRepository.info(
      data.user.id_cliente,
    )

    return {
      checkListStatusAction: allStatusAction,
    }
  }
}
