import CustomError from '@/config/CustomError'
import { env } from '@/env'
import ActionGroupRepository from '@/repositories/implementations/ActionGroupRepository'
import ActionRepository from '@/repositories/implementations/ActionRepository'
import { Client } from 'basic-ftp'
import IUseCase from '../../../models/IUseCase'
import IGetByClientRequestDTO from './IGetByClientRequestDTO'
import IGetByClientResponseDTO from './IGetByClientResponseDTO'

export default class GetByClientUseCase implements IUseCase {
  constructor(
    private actionRepository: ActionRepository,
    private actionGroupRepository: ActionGroupRepository,
  ) {}

  async execute(data: IGetByClientRequestDTO) {
    if (!data.user.id_cliente) {
      throw CustomError.unauthorized('Sem permissão')
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
    const groupsByClient = await this.actionGroupRepository.listByClient(
      data.user.id_cliente,
    )

    const groupIds = groupsByClient.map((group) => group.id)

    const actions = await this.actionRepository.listByGroup(groupIds)
    const response: IGetByClientResponseDTO[] = []
    for (const action of actions) {
      const remotePath = `/www/sistemas/_lib/img/checkListAction/groupAction_${action.id_grupo}`
      await client.ensureDir(remotePath)
      await client.cd(remotePath).then(async () => {
        const fileList = await client.list()

        const fileInfoPromises = fileList.map(async (fileItem) => {
          return {
            name: fileItem.name,
            url: `https://www.smartnewsystem.com.br/sistemas/_lib/img/checkListAction/groupAction_${action.id_grupo}/${fileItem.name}`,
            path: '',
          }
        })

        const fileInfo = await Promise.all(fileInfoPromises)

        response.push({
          ...action,
          img: fileInfo,
        })
      })
    }

    return response
  }
}
