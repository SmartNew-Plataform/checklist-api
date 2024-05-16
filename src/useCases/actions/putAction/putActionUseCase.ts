import CustomError from '@/config/CustomError'
import IActionGroupRepository from '@/repositories/IActionGroupRepository'
import IActionRepository from '@/repositories/IActionRepository'
import IFileService from '@/services/IFileService'
import IUseCase from '../../../models/IUseCase'
import IPutActionRequestDTO from './IPutActionRequestDTO'
import { env } from '@/env'

export default class PutActionUseCase implements IUseCase {
  constructor(
    private actionRepository: IActionRepository,
    private actionGroupRepository: IActionGroupRepository,
    private fileService: IFileService,
  ) {}

  async execute(data: IPutActionRequestDTO) {
    if (!data.user.id_cliente) {
      throw CustomError.unauthorized('Não autorizado')
    }

    try {
      const foundAction = await this.actionRepository.findById(data.id)
      if (!foundAction) {
        throw CustomError.badRequest('Ação não encontrada')
      }

      const groupId = foundAction.id_grupo
      if (!groupId) {
        console.log(foundAction)
        throw CustomError.badRequest('Grupo não encontrado')
      }
      if (data.endDate) {
        await this.actionGroupRepository.update(groupId, {
          data_fim: new Date(data.endDate),
        })
        await this.actionRepository.update(data.id, {
          data_fim: new Date(data.endDate),
        })
      }
      if (data.title) {
        await this.actionGroupRepository.update(groupId, {
          descricao: data.title,
        })
        await this.actionRepository.update(data.id, {
          descricao: data.title,
        })
      }
      if (data.description) {
        await this.actionGroupRepository.update(groupId, {
          descricao_acao: data.description,
        })
        await this.actionRepository.update(data.id, {
          descricao_acao: data.description,
        })
      }
      if (data.responsible) {
        await this.actionGroupRepository.update(groupId, {
          responsavel: data.responsible,
        })
        await this.actionRepository.update(data.id, {
          responsavel: data.responsible,
        })
      }
      if (data.dueDate) {
        await this.actionGroupRepository.update(groupId, {
          data_concluida: data.dueDate,
        })
        await this.actionRepository.update(data.id, {
          data_fechamento: data.dueDate,
        })
      }

      const updated = await this.actionGroupRepository.findById(groupId)
      const updatedAction = await this.actionRepository.findById(data.id)
      if (!updated) {
        throw CustomError.badRequest('Não foi possível editar essa ação')
      }

      const path = `${env.FILE_PATH}/checkListAction/groupAction_${updated.id}`

      const fileList = this.fileService.list(path)
      const img = fileList.map((fileItem) => {
        return {
          name: fileItem,
          url: `${env.URL_IMAGE}/checkListAction/groupAction_${updated.id}/${fileItem}`,
          path: `${env.URL_IMAGE}/checkListAction/groupAction_${updated.id}/${fileItem}`,
        }
      })

      return {
        ...updatedAction,
        img,
      }
    } catch (error) {
      console.log(error)
      throw CustomError.internalServerError(
        'Erro ao atualizar dados ' + JSON.stringify(error),
      )
    }
  }
}
