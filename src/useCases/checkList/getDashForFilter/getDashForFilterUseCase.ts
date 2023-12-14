import IUseCase from '@/models/IUseCase'
import IGetDashForFilterRequestDTO from './IGetDashForFilterRequestDTO'
import ICheckListStatusRepository from '@/repositories/ICheckListStatusRepository'
import IEquipmentRepository from '@/repositories/IEquipmentRepository'
import IGetDashForFilterResponseDTO from './IGetDashForFilterResponseDTO'
import IProductionRegisterRepository from '@/repositories/IProductionRegisterRepository'
import dayjs from 'dayjs'
import ICheckListPeriodRepository from '@/repositories/ICheckListPeriodRepository'

export default class GetDashForFilterUseCase implements IUseCase {
  constructor(
    private checkListStatusRepository: ICheckListStatusRepository,
    private equipmentRepository: IEquipmentRepository,
    private productionRegisterRepository: IProductionRegisterRepository,
    private checklistPeriodRepository: ICheckListPeriodRepository,
  ) {}

  async execute(data: IGetDashForFilterRequestDTO) {
    const startDate = data.startDate
      ? data.startDate
      : dayjs().subtract(1, 'month').toDate()
    const endDate = data.endDate ? data.endDate : dayjs().toDate()

    const countStatus = data.equipment
      ? await this.checkListStatusRepository.listByEquipmentAndDate(
          data.equipment,
          startDate,
          endDate,
        )
      : await this.checkListStatusRepository.countByBranch(
          data.user.branchBound.map((item) => item.branch.ID),
          startDate,
          endDate,
        )

    const response: IGetDashForFilterResponseDTO[] = []

    countStatus.forEach((value) => {
      const uniqueFamilies: { [key: string]: { [key: number]: boolean } } = {}

      value.checklistPeriod.forEach((item) => {
        if (
          !uniqueFamilies[
            item.productionRegister.equipment.familyEquipment.familia
          ]
        ) {
          uniqueFamilies[
            item.productionRegister.equipment.familyEquipment.familia
          ] = {}
        }
        uniqueFamilies[
          item.productionRegister.equipment.familyEquipment.familia
        ][item.productionRegister.id] = true
      })

      const count: { [key: string]: number } = {}
      for (const key in uniqueFamilies) {
        count[key] = Object.keys(uniqueFamilies[key]).length
      }

      // const family = value.checklistPeriod.reduce(
      //   (total: { [key: string]: number }, item) => {
      //     const familia =
      //       item.productionRegister.equipment.familyEquipment.familia
      //     if (!total[familia]) {
      //       total[familia] = 0
      //     }
      //     total[familia] = (total[familia] || 0) + 1
      //     return total
      //   },
      //   {} as { [key: string]: number },
      // )

      response.push({
        id: value.id,
        icon: value.icone,
        color: value.cor,
        description: value.descricao || '',
        action: value.acao || true,
        quantity: value.checklistPeriod.length,
        family: count,
      })
    })

    return response
  }
}
