import CustomError from '@/config/CustomError'
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
        throw CustomError.badRequest('Não foi possivel editar essa ação')
      }

      const remotePath = `/var/www/sistemas/_lib/img/checkListAction/groupAction_${found.id_grupo}`

      const fileList = this.fileService.list(remotePath)

      const img = fileList.map((fileItem) => {
        return {
          name: fileItem,
          url: `https://www.smartnewsystem.com.br/sistemas/_lib/img/checkListAction/groupAction_${found.id_grupo}/${fileItem}`,
          path: '',
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
