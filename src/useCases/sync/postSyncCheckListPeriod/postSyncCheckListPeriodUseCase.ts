import CustomError from '@/config/CustomError'
import IActionRepository from '@/repositories/IActionRepository'
import IUseCase from '../../../models/IUseCase'
import ICheckListPeriodRepository from '../../../repositories/ICheckListPeriodRepository'
import IPostSyncCheckListPeriodRequestDTO from './IPostSyncCheckListPeriodRequestDTO'

export default class PostSyncCheckListPeriodUseCase implements IUseCase {
  constructor(
    private checkListPeriodRepository: ICheckListPeriodRepository,
    private actionRepository: IActionRepository,
  ) {}

  async execute(data: IPostSyncCheckListPeriodRequestDTO) {
    const checkListPeriod = data.checkListPeriod

    if (data.type === 'inserted') {
      try {
        const periodObject = {
          id_filial: checkListPeriod.branchId,
          id_registro_producao: checkListPeriod.productionRegisterId,
          id_item_checklist: checkListPeriod.checkListItemId,
          status_item: checkListPeriod.statusItem,
          status_item_nc: checkListPeriod.statusNC,
          observacao: checkListPeriod.observation,
          log_date: checkListPeriod.logDate,
        }
        const result = await this.checkListPeriodRepository.create(periodObject)

        for (const action of data.checkListPeriod.actions) {
          await this.actionRepository.create({
            data_fim: action.endDate,
            data_inicio: action.startDate,
            descricao: action.title,
            descricao_acao: action.description,
            id_item: result.id,
            id_registro_producao: result.id_registro_producao || 0,
            responsavel: action.responsible,
            data_fechamento: action.dueDate,
          })
        }

        // console.log(result)

        return {
          inserted: true,
          id: result.id,
          _id: checkListPeriod._id,
        }
      } catch (error) {
        throw CustomError.internalServerError(
          'Erro ao salvar dados ' + JSON.stringify(error),
        )
      }
    } else if (data.type === 'updated') {
      try {
        await this.checkListPeriodRepository.update(checkListPeriod.id, {
          status_item: checkListPeriod.statusItem,
          status_item_nc: checkListPeriod.statusNC,
          observacao: checkListPeriod.observation,
          log_date: checkListPeriod.logDate,
        })

        for (const action of data.checkListPeriod.actions) {
          const found = await this.actionRepository.findById(action.id)

          if (found) {
            await this.actionRepository.update(action.id, {
              data_fechamento: action.dueDate,
              data_fim: action.endDate,
              responsavel: action.responsible,
              data_inicio: action.startDate,
              descricao: action.title,
              descricao_acao: action.description,
            })
          } else {
            await this.actionRepository.create({
              data_fim: new Date(action.endDate) || null,
              data_inicio: new Date(action.startDate) || null,
              descricao: action.title,
              descricao_acao: action.description,
              id_item: checkListPeriod.id,
              id_registro_producao: checkListPeriod.productionRegisterId,
              responsavel: action.responsible,
              data_fechamento: new Date(action.dueDate) || null,
            })
          }
        }

        return {
          updated: true,
        }
      } catch (error) {
        console.log(JSON.stringify(error, null, 2))
        throw CustomError.internalServerError(
          'Erro ao atualizar dados ' + JSON.stringify(error),
        )
      }
    } else {
      throw CustomError.badRequest('O tipo de inserção não foi especificado')
    }
  }
}
