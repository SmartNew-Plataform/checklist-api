import IUseCase from '@/models/IUseCase'
import IActionGroupRepository from '@/repositories/IActionGroupRepository'
import IGetActionGroupByIdRequestDTO from './IGetActionGroupByIdRequestDTO'

export default class GetActionGroupByIdUseCase implements IUseCase {
  constructor(private actionGroupRepostiory: IActionGroupRepository) {}

  async execute(data: IGetActionGroupByIdRequestDTO) {
    const found = await this.actionGroupRepostiory.findById(data.id)

    return found
  }
}
