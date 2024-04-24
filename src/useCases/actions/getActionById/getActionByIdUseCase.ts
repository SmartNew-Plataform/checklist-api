import CustomError from '@/config/CustomError'
import { env } from '@/env'
import IActionRepository from '@/repositories/IActionRepository'
import IFileService from '@/services/IFileService'
import IUseCase from '../../../models/IUseCase'
import IGetActionByIdRequestDTO from './IGetActionByIdRequestDTO'

export default class GetActionByIdUseCase implements IUseCase {
  constructor(
    private actionRepository: IActionRepository,
    private fileService: IFileService,
  ) {}

  async execute(data: IGetActionByIdRequestDTO) {
    if (!data.user.id_cliente) {
      throw CustomError.unauthorized('Não autorizado')
    }

    try {
      const found = await this.actionRepository.findById(data.id)
      if (!found) {
        throw CustomError.badRequest('Não foi possível editar essa ação')
      }

      const remotePath = `${env.FILE_PATH}/checkListAction/groupAction_${found.id_grupo}`

      const fileList = this.fileService.list(remotePath)

      const img = fileList.map((fileItem) => {
        return {
          name: fileItem,
          url: `${env.URL_IMAGE}/checkListAction/groupAction_${found.id_grupo}/${fileItem}`,
          path: `${env.URL_IMAGE}/checkListAction/groupAction_${found.id_grupo}/${fileItem}`,
        }
      })

      return {
        ...found,
        img,
      }
    } catch (error) {
      throw CustomError.internalServerError(
        'Erro ao buscar dados ' + JSON.stringify(error),
      )
    }
  }
}
