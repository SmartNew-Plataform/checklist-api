import IUseCase from '../models/IUseCase'
import IProductionRegisterRepository from '../repositories/IProductionRegisterRepository'
import IPostCheckListRequestDTO from './IPostCheckListRequestDTO'
import IEquipmentRepository from '../repositories/IEquipmentRepository'
import IPeriodRepository from '../repositories/IPeriodRepository'
import CustomError from '@/config/CustomError'
import ICheckListPeriodRepository from '../repositories/ICheckListPeriodRepository'
import ICheckListItemRepository from '../repositories/ICheckListItemRepository'

export default class PostCheckListUseCase implements IUseCase {
  constructor(
    private productionRegisterRepository: IProductionRegisterRepository,
    private equipmentRepository: IEquipmentRepository,
    private periodRepository: IPeriodRepository,
    private checkListItemRepository: ICheckListItemRepository,
    private checkListPeriodRepository: ICheckListPeriodRepository,
  ) {}

  async execute(data: IPostCheckListRequestDTO) {
    const equipment = await this.equipmentRepository.findById(data.equipmentId)

    if (!equipment) {
      throw CustomError.notFound('Equipamento não encontrado!')
    }

    const period = await this.periodRepository.findById(data.periodId)

    if (!period) {
      throw CustomError.notFound('Período não encontrado!')
    }

    const allCheckListItem =
      await this.checkListItemRepository.findTaskByFamily(
        equipment.ID_familia || 0,
      )

    if (allCheckListItem.length === 0) {
      throw CustomError.notFound('Tarefas não vinculados!')
    }

    const productionRegister = await this.productionRegisterRepository.save({
      id_centro_custo: equipment.id_centro_custo || 0,
      id_equipamento: equipment.ID,
      id_turno: period.id,
      quilometragem: data.mileage,
      login: data.user.login,
      DATA: data.initialTime,
      data_hora_inicio: data.initialTime,
      // turno: period.turno || 'Turno_1',
      status: 1,
      idlog: 0,
    })

    for await (const checkListItem of allCheckListItem) {
      await this.checkListPeriodRepository.create({
        id_filial: equipment.ID_filial,
        id_registro_producao: productionRegister.id,
        id_item_checklist: checkListItem.id,
      })
    }

    return {
      id: productionRegister.id,
    }
  }
}
