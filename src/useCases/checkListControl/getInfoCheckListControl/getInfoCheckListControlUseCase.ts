import IUseCase from '../models/IUseCase'
import ICheckListControlRepository from '../repositories/ICheckListControlRepository'
import IGetInfoCheckListControlRequestDTO from './IGetInfoCheckListControlRequestDTO'
import IGetInfoCheckListControlResponseDTO from './IGetInfoCheckListControlResponse'

export default class GetInfoCheckListControlUseCase implements IUseCase {
  constructor(
    private checkListControlRepository: ICheckListControlRepository,
  ) {}

  async execute(data: IGetInfoCheckListControlRequestDTO) {
    const allCheckListControl = await this.checkListControlRepository.info()

    const response: IGetInfoCheckListControlResponseDTO[] =
      allCheckListControl.map((item) => {
        return {
          id: item.id,
          description: item.descricao,
        }
      })

    return response
  }
}
