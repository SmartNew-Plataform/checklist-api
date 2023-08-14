import { Client } from 'basic-ftp'
import { env } from '@/env'
import path from 'path'
import fs from 'fs'
import IUseCase from '../../../models/IUseCase'
import ICheckListPeriodRepository from '../../../repositories/ICheckListPeriodRepository'
import IGetInfoByLoginRequestDTO from './IGetInfoByLoginRequestDTO'
import IGetInfoByLoginResponseDTO from './IGetInfoByLoginResponseDTO'
import IFTPService from '@/services/IFTPService'

export default class GetInfoByLoginUseCase implements IUseCase {
  constructor(
    private checkListPeriodRepository: ICheckListPeriodRepository,
    private FTPService: IFTPService,
  ) {}

  async execute(data: IGetInfoByLoginRequestDTO) {
    const client = new Client()

    await client.access({
      host: env.FTP_HOST,
      user: env.FTP_USER,
      password: env.FTP_PASS,
    })

    const allCheckListPeriod = await this.checkListPeriodRepository.infoByLogin(
      data.user.login,
    )

    const response: IGetInfoByLoginResponseDTO[] = []

    for await (const item of allCheckListPeriod) {
      const remotePath = `/www/sistemas/_lib/img/checkList/task_${item.id}`
      try {
        await client.cd(remotePath)

        const fileList = await client.list()

        const fileInfoPromises = fileList.map(async (fileItem) => {
          const filePath = path.join(remotePath, fileItem.name)
          const localTempPath = path.join(__dirname, fileItem.name)

          await this.FTPService.download(client, filePath, localTempPath)

          const fileDataBuffer = await fs.readFileSync(localTempPath)
          const fileDataBase64 = fileDataBuffer.toString('base64')

          await fs.unlinkSync(localTempPath)

          return {
            file: `https://www.smartnewsystem.com.br/sistemas/_lib/img/checkList/task_${item.id}/${fileItem.name}`,
            base64: fileDataBase64,
          }
        })

        const fileInfo = await Promise.all(fileInfoPromises)

        response.push({
          id: item.id,
          branchId: item.id_filial || 0,
          productionRegisterId: item.id_registro_producao || 0,
          checkListItemId: item.id_item_checklist || 0,
          img: fileInfo,
          statusItem: item.status_item || 0,
          statusNC: item.status_item_nc || 0,
          logDate: item.log_date,
        })
      } catch (error) {
        console.error(error)

        response.push({
          id: item.id,
          branchId: item.id_filial || 0,
          productionRegisterId: item.id_registro_producao || 0,
          checkListItemId: item.id_item_checklist || 0,
          img: [],
          statusItem: item.status_item || 0,
          statusNC: item.status_item_nc || 0,
          logDate: item.log_date,
        })
      }
    }

    client.close()

    return {
      checkListPeriod: response,
    }
  }
}
