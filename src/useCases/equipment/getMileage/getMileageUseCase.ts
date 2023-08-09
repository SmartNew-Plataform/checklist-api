import IUseCase from '../models/IUseCase'
import IGetMileageRequestDTO from './IGetMileageRequestDTO'
import IGetMileageResponseDTO from './IGetMileageResponseDTO'
import IProductionRegisterRepository from '../repositories/IProductionRegisterRepository'
import IEquipmentRepository from '../repositories/IEquipmentRepository'
import CustomError from '@/config/CustomError'

export default class GetMileageUseCase implements IUseCase {
  constructor(
    private productionRegister: IProductionRegisterRepository,
    private equipmentRepository: IEquipmentRepository,
  ) {}

  async execute(data: IGetMileageRequestDTO) {
    const allEquipment = await this.equipmentRepository.listByBranch(
      data.user.branchBound.map((item) => item.branch.ID),
    )

    if (!allEquipment.find((item) => item.ID === data.equipmentId)) {
      throw CustomError.notFound(
        'Equipamento não encontrado nos seus permitidos!',
      )
    }

    const mileage = await this.productionRegister.findLastMileageByEquipment(
      data.equipmentId,
    )

    const response: IGetMileageResponseDTO = {
      mileage,
    }

    return response
  }
}
