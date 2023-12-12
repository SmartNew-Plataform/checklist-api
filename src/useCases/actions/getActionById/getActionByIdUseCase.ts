import CustomError from '@/config/CustomError'
import { env } from '@/env'
import IActionRepository from '@/repositories/IActionRepository'
import { Client } from 'basic-ftp'
import IUseCase from '../../../models/IUseCase'
import IGetActionByIdRequestDTO from './IGetActionByIdRequestDTO'

export default class GetActionByIdUseCase implements IUseCase {
  constructor(private actionRepository: IActionRepository) {}

  async execute(data: IGetActionByIdRequestDTO) {
    if (!data.user.id_cliente) {
      throw CustomError.unauthorized('Não autorizado')
    }

    try {
      const found = await this.actionRepository.findById(data.id)
      if (!found) {
        throw CustomError.badRequest('Não foi possivel editar essa ação')
      }

      const client = new Client()

      await client
        .access({
          host: env.FTP_HOST,
          user: env.FTP_USER,
          password: env.FTP_PASS,
        })
        .catch((error) => {
          console.log('Nao Acessou FTP' + error)
        })

      const remotePath = `/www/sistemas/_lib/img/checkListAction/groupAction_${found.id_grupo}`
      const img: {
        name: string
        url: string
        path: string
      }[] = []
      await client.ensureDir(remotePath)
      await client.cd(remotePath).then(async () => {
        const fileList = await client.list()

        const fileInfoPromises = fileList.map(async (fileItem) => {
          return {
            name: fileItem.name,
            url: `https://www.smartnewsystem.com.br/sistemas/_lib/img/checkListAction/groupAction_${found.id_grupo}/${fileItem.name}`,
            path: '',
          }
        })

        const fileInfo = await Promise.all(fileInfoPromises)
        img.push(...fileInfo)
      })

      client.close()
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
