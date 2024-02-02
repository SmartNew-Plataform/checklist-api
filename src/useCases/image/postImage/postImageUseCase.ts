import CustomError from '@/config/CustomError'
import IUseCase from '@/models/IUseCase'
import IFileService from '@/services/IFileService'
import IPostImageRequestDTO from './IPostImageRequestDTO'
import IPostImageResponseDTO from './IPostImageResponseDTO'

export default class PostImageUseCase implements IUseCase {
  constructor(private fileService: IFileService) {}

  async execute(data: IPostImageRequestDTO): Promise<IPostImageResponseDTO> {
    const file = data.file
    const fileName = `${new Date().toISOString()}-${file.filename}`

    const path = `/var/www/sistemas/_lib/img/checkList/task_${data.checkListPeriodId}/${fileName}`
    console.log('[[ POST IMAGE ]]')

    try {
      this.fileService.write(path, await file.toBuffer())
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
