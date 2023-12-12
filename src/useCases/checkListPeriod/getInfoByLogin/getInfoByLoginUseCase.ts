import { env } from '@/env'
import { IAction } from '@/models/ICheckListPeriod'
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
      new Date(new Date().setDate(new Date().getDate() - 1)), // Ontem
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

              const actions: IAction[] = []
              for await (const action of item.smartnewsystem_producao_checklist_acao) {
                if (action.id_grupo) {
                  const actionRemotePath = `/www/sistemas/_lib/img/checkListAction/groupAction_${action.id_grupo}`
                  await client.cd(actionRemotePath).then(async () => {
                    const fileList = await client.list()

                    const actionFilePromises = fileList.map((fileItem) => {
                      return {
                        name: fileItem.name,
                        img: `https://www.smartnewsystem.com.br/sistemas/_lib/img/checkListAction/groupAction_${action.id_grupo}/${fileItem.name}`,
                        path: '',
                      }
                    })

                    const actionFileInfo = await Promise.all(actionFilePromises)

                    actions.push({
                      ...action,
                      img: actionFileInfo,
                    })
                  })
                }
              }

              response.push({
                id: item.id,
                branchId: item.id_filial || 0,
                productionRegisterId: item.id_registro_producao || 0,
                checkListItemId: item.id_item_checklist || 0,
                img: fileInfo,
                statusItem: item.status_item || 0,
                statusNC: item.status_item_nc || 0,
                logDate: item.log_date,
                actions: actions.map((action) => ({
                  id: action.id,
                  groupId: action.id_grupo,
                  title: action.descricao,
                  responsible: action.responsavel,
                  description: action.descricao_acao,
                  checklistId: action.id_registro_producao,
                  checklistPeriodId: action.id_item,
                  startDate: action.data_inicio,
                  dueDate: action.data_fechamento,
                  endDate: action.data_fim,
                  equipmentId: action.productionRegister.equipment?.ID || 0,
                  img: action.img,
                })),
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
                actions: item.smartnewsystem_producao_checklist_acao.map(
                  (action) => ({
                    id: action.id,
                    groupId: action.id_grupo,
                    title: action.descricao,
                    responsible: action.responsavel,
                    description: action.descricao_acao,
                    checklistId: action.id_registro_producao,
                    checklistPeriodId: action.id_item,
                    startDate: action.data_inicio,
                    dueDate: action.data_fechamento,
                    endDate: action.data_fim,
                    equipmentId: action.productionRegister.equipment?.ID || 0,
                    img: [],
                  }),
                ),
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
            actions: item.smartnewsystem_producao_checklist_acao.map(
              (action) => ({
                id: action.id,
                groupId: action.id_grupo,
                title: action.descricao,
                responsible: action.responsavel,
                description: action.descricao_acao,
                checklistId: action.id_registro_producao,
                checklistPeriodId: action.id_item,
                startDate: action.data_inicio,
                dueDate: action.data_fechamento,
                endDate: action.data_fim,
                equipmentId: action.productionRegister.equipment?.ID || 0,
                img: [],
              }),
            ),
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
          actions: item.smartnewsystem_producao_checklist_acao.map(
            (action) => ({
              id: action.id,
              groupId: action.id_grupo,
              title: action.descricao,
              responsible: action.responsavel,
              description: action.descricao_acao,
              checklistId: action.id_registro_producao,
              checklistPeriodId: action.id_item,
              startDate: action.data_inicio,
              dueDate: action.data_fechamento,
              endDate: action.data_fim,
              equipmentId: action.productionRegister.equipment?.ID || 0,
              img: [],
            }),
          ),
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
