import IUseCase from '../../../models/IUseCase'
import IPatchRegisterPopulationRequestDTO from './IPatchRegisterPopulationRequestDTO'
import IEquipmentRegisterRepository from '../../../repositories/IEquipmentRegisterRepository'
import IEquipmentRepository from '../../../repositories/IEquipmentRepository'
import IProductionRegisterRepository from '../../../repositories/IProductionRegisterRepository'
import IProductionRegisterDataRepository from '../../../repositories/IProductionRegisterDataRepository'

export default class PatchRegisterPopulationUseCase implements IUseCase {
  constructor(
    private equipmentRegisterRepository: IEquipmentRegisterRepository,
    private equipmentRepository: IEquipmentRepository,
    private productionRegisterRepository: IProductionRegisterRepository,
    private productionRegisterDataRepository: IProductionRegisterDataRepository,
  ) {}

  async execute(data: IPatchRegisterPopulationRequestDTO) {
    const allEquipment = await this.equipmentRepository.listByBranch(
      data.user.branchBound.map((item) => item.branch.ID),
    )

    const response: any[] = []

    for await (const equipment of allEquipment) {
      const mileage =
        await this.productionRegisterRepository.findLastMileageByEquipment(
          equipment.ID,
        )

      const hourMeter =
        await this.productionRegisterDataRepository.findLastHourMeterByEquipment(
          equipment.ID,
        )

      const register = await this.equipmentRegisterRepository.create({
        id_cliente: equipment.ID_cliente || 0,
        id_equipamento: equipment.ID,
        quilometragem: mileage,
        horimetro: hourMeter,
      })

      response.push(register)
    }

    return response
  }
}
