import CustomError from '@/config/CustomError'
import IUseCase from '@/models/IUseCase'
import IFileService from '@/services/IFileService'
import IPostActionImageRequestDTO from './IPostActionImageRequestDTO'
import IPostActionImageResponseDTO from './IPostActionImageResponseDTO'
import { env } from '@/env'

export default class PostActionImageUseCase implements IUseCase {
  constructor(private fileService: IFileService) {}

  async execute(
    data: IPostActionImageRequestDTO,
  ): Promise<IPostActionImageResponseDTO> {
    const file = data.file
    const fileName = `${new Date().toISOString()}-${file.filename}`

    // const path = `../sistemas/_lib/img/checkListAction/groupAction_${data.actionGroupId}`
    const path = `${env.FILE_PATH}/checkListAction/groupAction_${data.actionGroupId}`
    console.log('[[ POST ACTION IMAGE ]]')

    try {
      this.fileService.write(path, fileName, await file.toBuffer())

      console.log(`[${new Date()}]: Escreveu arquivo no diretorio ${path}`)
    } catch (error) {
      console.log(error)
      throw CustomError.internalServerError(
        'Não foi possível escrever o arquivo',
      )
    }

    return {
      inserted: true,
    }
  }
}
