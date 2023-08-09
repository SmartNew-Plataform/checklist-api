import IUseCase from '../../../models/IUseCase'
import IGetHourMeterAndMileageRequestDTO from './IGetHourMeterAndMileageRequestDTO'
import IProductionRegisterDataRepository from '../../../repositories/IProductionRegisterDataRepository'
import IGetHourMeterAndMileageResponseDTO from './IGetHourMeterAndMileageResponseDTO'
import IProductionRegisterRepository from '../../../repositories/IProductionRegisterRepository'
import IEquipmentRepository from '../../../repositories/IEquipmentRepository'
import CustomError from '@/config/CustomError'

export default class GetHourMeterAndMileageUseCase implements IUseCase {
  constructor(
    private productionRegisterData: IProductionRegisterDataRepository,
    private productionRegister: IProductionRegisterRepository,
    private equipmentRepository: IEquipmentRepository,
  ) {}

  async execute(data: IGetHourMeterAndMileageRequestDTO) {
    const allEquipment = await this.equipmentRepository.listByBranch(
      data.user.branchBound.map((item) => item.branch.ID),
    )

    if (!allEquipment.find((item) => item.ID === data.equipmentId)) {
      throw CustomError.notFound(
        'Equipamento não encontrado nos seus permitidos!',
      )
    }

    const hourMeter =
      await this.productionRegisterData.findLastHourMeterByEquipment(
        data.equipmentId,
      )

    const mileage = await this.productionRegister.findLastMileageByEquipment(
      data.equipmentId,
    )
    const response: IGetHourMeterAndMileageResponseDTO = {
      hourMeter,
      mileage,
    }

    return response
  }
}
