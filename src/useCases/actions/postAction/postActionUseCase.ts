import CustomError from '@/config/CustomError'
import IActionGroupRepository from '@/repositories/IActionGroupRepository'
import IActionRepository from '@/repositories/IActionRepository'
import IUseCase from '../../../models/IUseCase'
import IPostActionRequestDTO from './IPostActionRequestDTO'

export default class PostActionUseCase implements IUseCase {
  constructor(
    private actionRepository: IActionRepository,
    private actionGroupRepository: IActionGroupRepository,
  ) {}

  async execute(data: IPostActionRequestDTO) {
    if (!data.user.id_cliente) {
      throw CustomError.unauthorized('Não autorizado')
    }

    try {
      const group = await this.actionGroupRepository.create({
        id_cliente: data.user.id_cliente,
        numero: 1,
        data_fim: new Date(data.dueDate),
        data_concluida: data.endDate ? new Date(data.endDate) : null,
        data_inicio: new Date(data.startDate),
        descricao: data.title,
        descricao_acao: data.description,
        id_registro_producao: data.checklistId,
        responsavel: data.responsible,
      })
      const inserted = await this.actionRepository.create({
        id_grupo: group.id,
        data_fim: data.endDate ? new Date(data.endDate) : null,
        data_inicio: new Date(data.startDate),
        descricao: data.title,
        descricao_acao: data.description,
        id_item: data.checklistPeriodId,
        // id_registro_producao: data.checklistId,
        id_checklist: data.checklistId,
        responsavel: data.responsible,
        data_fechamento: new Date(data.dueDate),
      })

      return {
        ...inserted,
      }
    } catch (error) {
      throw CustomError.internalServerError(
        'Erro ao salvar dados ' + JSON.stringify(error),
      )
    }
  }
}
