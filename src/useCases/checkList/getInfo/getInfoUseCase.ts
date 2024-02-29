import dayjs from 'dayjs'
import IUseCase from '../../../models/IUseCase'
import IProductionRegisterRepository from '../../../repositories/IProductionRegisterRepository'
import IGetInfoRequestDTO from './IGetInfoRequestDTO'
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
      new Date(new Date().setDate(new Date().getDate() - 1)), // Ontem
    )

    const response: IGetInfoResponseDTO[] = []
    for (const item of register) {
      if (item.DATA && item.data_hora_inicio) {
        response.push({
          id: item.id,
          costCenterId: item.id_centro_custo || 0,
          equipmentId: item.equipment?.ID || 0,
          periodId: item.id_turno,
          date: item.DATA,
          initialTime: item.data_hora_inicio,
          finalTime: item.data_hora_encerramento,
          status: item.status ? 'open' : 'close',
          dataLog: item.data_log,
          login: item.login || '',
          initialMileage: Number(item.quilometragem) || 0,
          finalMileage: Number(item.quilometragem_final) || 0,
          code: item.equipment?.equipamento_codigo || '',
          description: item.equipment?.descricao || '',
        })
      }
    }

    return response
  }
}
