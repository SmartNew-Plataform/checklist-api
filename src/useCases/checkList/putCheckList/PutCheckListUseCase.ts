import CustomError from '@/config/CustomError'
import IUseCase from '@/models/IUseCase'
import ISmartCheckListRepository from '@/repositories/ISmartCheckListRepository'
import { IPutChecklistRequestDTO } from './IPutChecklistRequestDTO'
import IEquipmentRegisterRepository from '@/repositories/IEquipmentRegisterRepository'

export default class PutCheckListUseCase implements IUseCase {
  constructor(
    private smartCheckListRepository: ISmartCheckListRepository,
    private equipmentRegisterRepository: IEquipmentRegisterRepository,
  ) {}

  async execute(data: IPutChecklistRequestDTO) {
    if (!data.user.id_cliente) {
      throw CustomError.notFound('Usuário não encontrado!')
    }

    const smartCheckList = await this.smartCheckListRepository.findById(data.id)

    if (!smartCheckList) {
      throw CustomError.notFound('Checklist não encontrado!')
    }

    await this.smartCheckListRepository.update(data.id, {
      data_hora_encerramento: data.finalTime,
      status: data.status === 'open' ? 1 : 0,
      horimetro: data.hourMeter ?? null,
      odometro: data.odometer ?? null,
      quilometragem: data.mileage ?? null,
    })

    if (smartCheckList?.equipment?.ID) {
      let registerEquipment =
        await this.equipmentRegisterRepository.findByEquipment(
          smartCheckList.equipment.ID,
        )

      if (!registerEquipment) {
        registerEquipment = await this.equipmentRegisterRepository.create({
          id_cliente: data.user.id_cliente,
          id_equipamento: smartCheckList.equipment.ID,
          horimetro: data.hourMeter ?? 0,
          quilometragem: data.mileage ?? 0,
        })
      }

      await this.equipmentRegisterRepository.update(registerEquipment.id, {
        horimetro: data.hourMeter ?? registerEquipment.horimetro,
        quilometragem: data.mileage ?? registerEquipment.quilometragem,
        update_log_date: new Date(),
      })
    }

    return {
      id: data.id,
      updated: true,
    }
  }
}
