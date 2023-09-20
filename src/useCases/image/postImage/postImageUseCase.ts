import CustomError from '@/config/CustomError'
import IUseCase from '@/models/IUseCase'
import IFTPService from '@/services/IFTPService'
import { Client } from 'basic-ftp'
import fs from 'fs'
import IPostImageRequestDTO from './IPostImageRequestDTO'
import IPostImageResponseDTO from './IPostImageResponseDTO'

export default class PostImageUseCase implements IUseCase {
  constructor(private FTPService: IFTPService) {}

  async execute(data: IPostImageRequestDTO): Promise<IPostImageResponseDTO> {
    const file = data.file
    const fileName = `${new Date().toISOString()}-${file.filename}`
    const path = `../../../../public/uploads/${fileName}`

    const remotePath = `/www/sistemas/_lib/img/checkList/task_${data.checkListPeriodId}`
    const client = new Client()
    await this.FTPService.connect(client).catch((error) => {
      console.log(`[${new Date()}]: Nao Acessou FTP ${error}`)
    })

    try {
      fs.writeFileSync(path, await file.toBuffer())

      await client.ensureDir(remotePath)
      await client.uploadFrom(path, `${remotePath}/${fileName}`)
      console.log(
        `[${new Date()}]: Escreveu arquivo no diretorio ${remotePath}/${fileName}`,
      )
    } catch (error) {
      console.log(error)
      throw CustomError.internalServerError(
        'Não foi possível escrever o arquivo',
      )
    }

    client.close()
    fs.unlink(path, (error) => {
      if (error) console.log(error)
    })

    return {
      inserted: true,
    }
  }
}
