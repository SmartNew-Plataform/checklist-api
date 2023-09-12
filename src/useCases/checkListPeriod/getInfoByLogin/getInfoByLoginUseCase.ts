import { env } from '@/env'
import IFTPService from '@/services/IFTPService'
import { Client } from 'basic-ftp'
import IUseCase from '../../../models/IUseCase'
import ICheckListPeriodRepository from '../../../repositories/ICheckListPeriodRepository'
import IGetInfoByLoginRequestDTO from './IGetInfoByLoginRequestDTO'
import IGetInfoByLoginResponseDTO from './IGetInfoByLoginResponseDTO'

export default class GetInfoByLoginUseCase implements IUseCase {
  constructor(
    private checkListPeriodRepository: ICheckListPeriodRepository,
    private FTPService: IFTPService,
  ) {}

  async execute(data: IGetInfoByLoginRequestDTO) {
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

    const allCheckListPeriod = await this.checkListPeriodRepository.infoByLogin(
      data.user.login,
    )

    const response: IGetInfoByLoginResponseDTO[] = []
    console.log('Buscando Imagens...')

    const pathCheckList = 'sistemas/_lib/img/checkList'

    let allNamesIds: any[] = []

    await client
      .cd(pathCheckList)
      .then(async () => {
        const fileList = await client.list()

        allNamesIds = fileList.map((item) => item.name.split('_')[1] || '')
      })
      .catch((error) => {
        console.error(error)
      })

    // console.log(allNamesIds)

    for await (const item of allCheckListPeriod) {
      const remotePath = `/www/sistemas/_lib/img/checkList/task_${item.id}`
      try {
        const findTask = allNamesIds.find((value) => Number(value) === item.id)

        if (findTask) {
          // console.log('Encontrei Pasta : ' + findTask)

          await client
            .cd(remotePath)
            .then(async () => {
              const fileList = await client.list()

              const fileInfoPromises = fileList.map(async (fileItem) => {
                return {
                  name: fileItem.name,
                  url: `https://www.smartnewsystem.com.br/sistemas/_lib/img/checkList/task_${item.id}/${fileItem.name}`,
                  path: '',
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
            })
            .catch((error) => {
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
            })
        } else {
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
    console.log('Finalizado a busca...')

    client.close()

    return {
      checkListPeriod: response,
    }
  }
}
