import dayjs from 'dayjs'
import IUseCase from '../../../models/IUseCase'
import IGetCheckListLimitTimeRequestDTO from './IGetCheckListByLimitTimeRequestDTO'
import IProductionRegisterRepository from '../../../repositories/IProductionRegisterRepository'
import IGetCheckListByLimitTimeResponseDTO from './IGetCheckListByLimitTimeResponseDTO'

export default class GetCheckListByLimitTimeUseCase implements IUseCase {
  constructor(
    private productionRegisterRepository: IProductionRegisterRepository,
  ) {}

  async execute(data: IGetCheckListLimitTimeRequestDTO) {
    const dateStatic = dayjs().subtract(2, 'd')

    console.log(dateStatic)

    const register = await this.productionRegisterRepository.listRegisterByTime(
      dateStatic.toDate(),
      data.user.branchBound.map((item) => item.branch.ID),
      data.user.login,
      dateStatic.toDate(),
    )

    const response: IGetCheckListByLimitTimeResponseDTO[] = register.map(
      (item) => {
        return {
          id: item.id,
          date: dayjs(item.DATA).format('DD/MM/YYYY'),
          period: item.turno || '',
          code: item.equipment?.equipamento_codigo || '',
          description: item.equipment?.descricao || '',
          status: item.status ? 'open' : 'close',
          equipmentId: item.equipment?.ID || 0,
          mileage: Number(item.quilometragem),
          finalMileage: Number(item.quilometragem_final) || 0,
          initialTime: dayjs(item.data_hora_inicio).format(
            'DD-MM-YYYY HH:mm:ss',
          ),
          login: item.login || '',
          periodId: item.id_turno || 0,
        }
      },
    )

    return response
  }
}
