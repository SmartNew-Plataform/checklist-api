import IUseCase from '@/models/IUseCase'
import IActionGroupRepository from '@/repositories/IActionGroupRepository'
import IGetActionGroupByIdRequestDTO from './IGetActionGroupByIdRequestDTO'

export default class GetActionGroupByIdUseCase implements IUseCase {
  constructor(private actionGroupRepository: IActionGroupRepository) {}

  async execute(data: IGetActionGroupByIdRequestDTO) {
    const found = await this.actionGroupRepository.findById(data.id)

    return found
  }
}
