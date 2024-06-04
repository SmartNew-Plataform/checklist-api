import IUseCase from '@/models/IUseCase'
import ISmartCheckListRepository from '@/repositories/ISmartCheckListRepository'
import { IGetChecklistsRequest } from './IGetChecklistRequest'
import IGetChecklistResponseDTO from './IGetChecklistResponseDTO'

export default class GetChecklistUseCase implements IUseCase {
  constructor(private checklistRepository: ISmartCheckListRepository) {}

  async execute(data: IGetChecklistsRequest) {
    // console.log(data)
    // console.log(data.user.branchBound)
    // console.log(new Date(new Date().setDate(new Date().getDate() - 1)))
    const register = await this.checklistRepository.listChecklistByTime(
      data.user.branchBound.map((item) => item.branch.ID),
      data.user.login,
      new Date(new Date().setDate(new Date().getDate() - 1)), // Ontem
    )

    const response: IGetChecklistResponseDTO[] = []
    for (const item of register) {
      if (item.data_hora_inicio) {
        response.push({
          id: item.id,
          equipmentId: item.equipment ? item.equipment.ID : null,
          locationId: item.location ? item.location.id : null,
          periodId: item.id_turno,
          hourMeter: item.horimetro,
          mileage: item.quilometragem,
          odometer: item.odometro,
          initialTime: item.data_hora_inicio,
          finalTime: item.data_hora_encerramento,
          status: item.status ? 'open' : 'close',
          login: item.login || '',
        })
      }
    }

    return response
  }
}
