import IUseCase from '@/models/IUseCase'
import ILocationRepository from '@/repositories/ILocationRepository'
import { IGetLocationRequestDTO } from './IGetLocationRequestDTO'

export default class GetLocationUseCase implements IUseCase {
  constructor(private locationRepository: ILocationRepository) {}

  async execute(data: IGetLocationRequestDTO) {
    const locations = await this.locationRepository.listByBranch(
      data.user.branchBound.map((item) => item.branch.ID),
    )

    const response = locations.map((item) => ({
      id: item.id,
      branchId: item.id_filial,
      location: item.tag
        ? `${item.tag}-${item.localizacao}`
        : item.localizacao || '',
    }))

    return response
  }
}
