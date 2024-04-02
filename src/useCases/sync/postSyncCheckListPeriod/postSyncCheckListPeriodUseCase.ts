import CustomError from '@/config/CustomError'
import IActionGroupRepository from '@/repositories/IActionGroupRepository'
import IActionRepository from '@/repositories/IActionRepository'
import IUseCase from '../../../models/IUseCase'
import ICheckListPeriodRepository from '../../../repositories/ICheckListPeriodRepository'
import IPostSyncCheckListPeriodRequestDTO from './IPostSyncCheckListPeriodRequestDTO'

export default class PostSyncCheckListPeriodUseCase implements IUseCase {
  constructor(
    private checkListPeriodRepository: ICheckListPeriodRepository,
    private actionRepository: IActionRepository,
    private actionGroupRepository: IActionGroupRepository,
  ) {}

  async execute(data: IPostSyncCheckListPeriodRequestDTO) {
    const checkListPeriod = data.checkListPeriod
    console.log('Post period')
    console.log(checkListPeriod)

    if (!data.user.id_cliente) return

    if (data.type === 'inserted') {
      try {
        const result = await this.checkListPeriodRepository.create({
          id_filial: checkListPeriod.branchId,
          id_checklist: checkListPeriod.productionRegisterId,
          id_item_checklist: checkListPeriod.checkListItemId,
          status_item: checkListPeriod.statusItem,
          status_item_nc: checkListPeriod.statusNC,
          observacao: checkListPeriod.observation,
          log_date: checkListPeriod.logDate,
        })

        return result
      } catch (error) {
        throw CustomError.internalServerError(
          'Erro ao salvar dados ' + JSON.stringify(error),
          error as object,
        )
      }
    } else if (data.type === 'updated') {
      try {
        const updated = await this.checkListPeriodRepository.update(
          checkListPeriod.id,
          {
            status_item: checkListPeriod.statusItem,
            status_item_nc: checkListPeriod.statusNC,
            observacao: checkListPeriod.observation,
            log_date: checkListPeriod.logDate,
          },
        )

        return updated
      } catch (error) {
        // console.log(JSON.stringify(error, null, 2))
        throw CustomError.internalServerError(
          'Erro ao atualizar dados ' + JSON.stringify(error),
        )
      }
    } else {
      throw CustomError.badRequest('O tipo de inserção não foi especificado')
    }
  }
}
