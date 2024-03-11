import IUseCase from '@/models/IUseCase'
import IEquipmentRegisterRepository from '@/repositories/IEquipmentRegisterRepository'
import IProductionRegisterRepository from '@/repositories/IProductionRegisterRepository'
import dayjs from 'dayjs'
import { IGetChecklistsRequest } from './IGetChecklistRequest'
import { Checklist } from './types'

export default class GetChecklistUseCase implements IUseCase {
  constructor(
    private productionRegisterRepository: IProductionRegisterRepository,
    private equipmentRepositroy: IEquipmentRegisterRepository,
  ) {}

  async execute(data: IGetChecklistsRequest) {
    const dateStatic = dayjs('2022-01-01')
    const register = await this.productionRegisterRepository.listRegisterByTime(
      dateStatic.toDate(),
      data.user.branchBound.map((item) => item.branch.ID),
      data.user.login,
      new Date(new Date().setDate(new Date().getDate() - 1)), // Ontem
    )

    const response: Checklist[] = register
      .filter(
        (item) =>
          item.login === data.user.login && item.DATA && item.data_hora_inicio,
      )
      .map((item) => ({
        id: item.id,
        equipmentId: item.equipment?.ID || 0,
        periodId: item.id_turno,
        date: item.DATA as Date,
        initialTime: item.data_hora_inicio as Date,
        finalTime: item.data_hora_encerramento,
        status: item.status ? 'open' : 'close',
        checklistPeriods: [],
        signatures: [],
      }))

    return response
  }
}
