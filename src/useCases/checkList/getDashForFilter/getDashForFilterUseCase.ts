import IUseCase from '@/models/IUseCase'
import IGetDashForFilterRequestDTO from './IGetDashForFilterRequestDTO'
import ICheckListStatusRepository from '@/repositories/ICheckListStatusRepository'
import IEquipmentRepository from '@/repositories/IEquipmentRepository'
import IGetDashForFilterResponseDTO from './IGetDashForFilterResponseDTO'
import IProductionRegisterRepository from '@/repositories/IProductionRegisterRepository'
import CustomError from '@/config/CustomError'
import dayjs from 'dayjs'

export default class GetDashForFilterUseCase implements IUseCase {
  constructor(
    private checkListStatusRepository: ICheckListStatusRepository,
    private equipmentRepository: IEquipmentRepository,
    private productionRegisterRepository: IProductionRegisterRepository,
  ) {}

  async execute(data: IGetDashForFilterRequestDTO) {
    const allFamily: {
      id: number
      name: string
      quantity: number
      status: {
        id: number
        name: string
        count: number
      }[]
    }[] = []

    const summaryCards: IGetDashForFilterResponseDTO['summaryCards'] = []
    console.log(data.equipment)
    if (!data.equipment) {
      const allEquipment = await this.equipmentRepository.listByBranch(
        data.user.branchBound.map((item) => item.branch.ID),
      )
      console.log(allEquipment)
      data.equipment = allEquipment.map((item) => item.ID)
    }

    for await (const equipmentId of data.equipment) {
      const equipment = await this.equipmentRepository.findById(equipmentId)
      if (!equipment) {
        throw CustomError.notFound('Equipamento não encontrado')
      }

      const allProductionRegister =
        await this.productionRegisterRepository.listByEquipment(
          equipment.ID,
          data.startDate || dayjs().subtract(1, 'M').toDate(),
          data.endDate || dayjs().toDate(),
        )

      for await (const productionRegister of allProductionRegister) {
        // console.log(productionRegister)

        let index = allFamily.findIndex(
          (item) =>
            item.id === equipment.cadastro_de_familias_de_equipamento?.ID || 0,
        )

        if (index < 0) {
          allFamily.push({
            id: equipment.cadastro_de_familias_de_equipamento?.ID || 0,
            name: equipment.cadastro_de_familias_de_equipamento?.familia || '',
            quantity: 1,
            status: [],
          })

          index = allFamily.findIndex(
            (item) =>
              item.id === equipment.cadastro_de_familias_de_equipamento?.ID ||
              0,
          )
        } else {
          allFamily[index].quantity++
        }

        const allStatus = await this.checkListStatusRepository.findByClient(
          data.user.id_cliente || 0,
        )

        for await (const checkListPeriod of productionRegister.checkListPeriod) {
          const status = allStatus.find(
            (item) => item.id === checkListPeriod.status_item,
          )

          let findIndexStatus = summaryCards.findIndex(
            (item) => item.id === Number(checkListPeriod.status_item),
          )

          if (findIndexStatus < 0 && status) {
            summaryCards.push({
              id: status.id,
              color: status.cor || '',
              description: status.descricao || '',
              icon: status.icone || '',
              quantity: 1,
            })

            findIndexStatus = summaryCards.findIndex(
              (item) => item.id === Number(checkListPeriod.status_item),
            )
          } else if (findIndexStatus > 0) {
            summaryCards[findIndexStatus].quantity++
          } else {
            continue
          }

          const findIndexStatusFamily = allFamily[index].status.findIndex(
            (item) => item.id === Number(checkListPeriod.status_item),
          )

          // allFamily[index].quantity++

          if (findIndexStatusFamily < 0) {
            allFamily[index].status.push({
              id: summaryCards[findIndexStatus].id,
              name: summaryCards[findIndexStatus].description,
              count: 1,
            })
          } else {
            // allFamily[index].quantity++
            allFamily[index].status[findIndexStatusFamily].count++
          }
        }

        allFamily[index].quantity = allFamily.reduce(
          (acc, value) => value.quantity + acc,
          0,
        )
      }
    }

    const allCountStatus = summaryCards.reduce(
      (acc, value) => value.quantity + acc,
      0,
    )

    const status = summaryCards.map((item) => {
      const value = (item.quantity / allCountStatus) * 100

      return {
        [item.description]: value,
      }
    })

    const response: IGetDashForFilterResponseDTO = {
      family: allFamily,
      summaryCards,
      status,
    }

    return response
  }
}
