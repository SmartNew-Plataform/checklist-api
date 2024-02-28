import CustomError from '@/config/CustomError'
import IUseCase from '../../../models/IUseCase'
import IEquipmentRepository from '../../../repositories/IEquipmentRepository'
import IProductionRegisterRepository from '../../../repositories/IProductionRegisterRepository'
import IPostSyncCheckListSchemaRequestDTO from './IPostSyncCheckListSchemaRequestDTO'

export default class PostSyncCheckListSchemaUseCase implements IUseCase {
  constructor(
    private productionRegisterRepository: IProductionRegisterRepository,
    private equipmentRepository: IEquipmentRepository,
  ) {}

  async execute(data: IPostSyncCheckListSchemaRequestDTO) {
    const productionRegisterItem = data.checkListSchema
    const equipment = await this.equipmentRepository.findById(
      productionRegisterItem.equipmentId,
    )
    if (!equipment) {
      throw CustomError.notFound('Equipamento não encontrado!')
    }
    if (data.type === 'inserted') {
      try {
        const productionRegister = await this.productionRegisterRepository.save(
          {
            id_centro_custo: equipment.id_centro_custo,
            id_equipamento: equipment.ID,
            id_turno:
              productionRegisterItem.periodId === 0
                ? null
                : productionRegisterItem.periodId,
            quilometragem: productionRegisterItem.mileage,
            quilometragem_final: productionRegisterItem.finalMileage,
            login: productionRegisterItem.login,
            DATA: productionRegisterItem.date,
            data_hora_inicio: productionRegisterItem.initialTime,
            data_hora_encerramento: productionRegisterItem.finalTime,
            turno: null,
            status: productionRegisterItem.status === 'open' ? 1 : 0,
            idlog: 0,
          },
        )
        // console.log(productionRegister)
        return {
          inserted: true,
          id: productionRegister.id,
          _id: productionRegisterItem._id,
        }
      } catch (error) {
        throw CustomError.badRequest(
          'Já existe um cabeçalho registrado para esse periodID',
        )
      }
    } else if (data.type === 'updated') {
      await this.productionRegisterRepository.update(
        productionRegisterItem.id,
        {
          quilometragem: productionRegisterItem.mileage,
          quilometragem_final: productionRegisterItem.finalMileage,
          DATA: productionRegisterItem.date,
          data_hora_inicio: productionRegisterItem.initialTime,
          data_hora_encerramento: productionRegisterItem.finalTime,
          turno: null,
          status: productionRegisterItem.status === 'open' ? 1 : 0,
          idlog: 0,
        },
      )

      return {
        updated: true,
        id: productionRegisterItem.id,
      }
    }
  }
}
