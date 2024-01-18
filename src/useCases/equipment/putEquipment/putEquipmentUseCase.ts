import IUseCase from '@/models/IUseCase'
import IEquipmentRepository from '@/repositories/IEquipmentRepository'
import IPutEquipmentRequestDTO from './IPutEquipmentRequestDTO'

export default class PutEquipmentUseCase implements IUseCase {
  constructor(private equipmentRepository: IEquipmentRepository) {}

  async execute(data: IPutEquipmentRequestDTO) {
    const equipment = await this.equipmentRepository.updateHourMeterAndMileage(
      data.id,
      data.hourMeter,
      data.mileage,
    )
    return equipment
  }
}
