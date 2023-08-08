import IUseCase from '../../../models/IUseCase'
import IGetInfoRequestDTO from './IGetInfoRequestDTO'
import IProductionRegisterRepository from '../../../repositories/IProductionRegisterRepository'
import dayjs from 'dayjs'
import IGetInfoResponseDTO from './IGetInfoResponseDTO'

export default class GetInfoUseCase implements IUseCase {
  constructor(
    private productionRegisterRepository: IProductionRegisterRepository,
  ) {}

  async execute(data: IGetInfoRequestDTO) {
    const dateStatic = dayjs('2022-01-01')
    const register = await this.productionRegisterRepository.listRegisterByTime(
      dateStatic.toDate(),
      data.user.branchBound.map((item) => item.branch.ID),
      data.user.login,
    )

    const response: IGetInfoResponseDTO[] = register.map((item) => {
      return {
        id: item.id,
        costCenterId: item.id_centro_custo || 0,
        equipmentId: item.equipment?.ID || 0,
        periodId: item.id_turno,
        data: item.DATA,
        initialTime: item.data_hora_encerramento,
        finalTime: item.data_hora_inicio,
        status: item.status ? 'open' : 'close',
        dataLog: item.data_log,
        login: item.login || '',
        initialMileage: item.quilometragem,
        finalMileage: item.quilometragem_final,
        period: item.turno,
      }
    })

    return response
  }
}
