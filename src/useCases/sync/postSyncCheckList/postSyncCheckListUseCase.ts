import { v4 as UUID4 } from 'uuid'
import fs from 'fs'
import path from 'path'
import { Client } from 'basic-ftp'
import IUseCase from '../../../models/IUseCase'
import IPostSyncCheckListRequestDTO from './IPostSyncCheckListRequestDTO'
import IProductionRegisterRepository from '../../../repositories/IProductionRegisterRepository'
import ICheckListPeriodRepository from '../../../repositories/ICheckListPeriodRepository'
import IEquipmentRepository from '../../../repositories/IEquipmentRepository'
import CustomError from '@/config/CustomError'
import { env } from '@/env'

export default class PostSyncCheckListUseCase implements IUseCase {
  constructor(
    private productionRegisterRepository: IProductionRegisterRepository,
    private equipmentRepository: IEquipmentRepository,
    private checkListPeriodRepository: ICheckListPeriodRepository,
  ) {}

  async execute(data: IPostSyncCheckListRequestDTO) {
    // inserted
    for await (const productionRegisterItem of data.checkListSchema.inserted) {
      const allCheckListPeriod = data.checkListPeriod.inserted.filter(
        (item) => item.productionRegisterId === productionRegisterItem._id,
      )

      const equipment = await this.equipmentRepository.findById(
        productionRegisterItem.equipmentId,
      )

      if (!equipment) {
        throw CustomError.notFound('Equipamento não encontrado!')
      }

      const productionRegister = await this.productionRegisterRepository.save({
        id_centro_custo: equipment.id_centro_custo,
        id_equipamento: equipment.ID,
        id_turno: productionRegisterItem.periodId,
        quilometragem: productionRegisterItem.mileage,
        quilometragem_final: productionRegisterItem.finalMileage,
        login: productionRegisterItem.login,
        DATA: productionRegisterItem.date,
        data_hora_inicio: productionRegisterItem.initialTime,
        data_hora_encerramento: productionRegisterItem.finalTime,
        turno: null,
        status: productionRegisterItem.status === 'open' ? 1 : 0,
        idlog: 0,
      })

      for await (const checkListPeriodItem of allCheckListPeriod) {
        const checkListPeriod = await this.checkListPeriodRepository.create({
          id_filial: checkListPeriodItem.branchId,
          id_registro_producao: productionRegister.id,
          id_item_checklist: checkListPeriodItem.checkListItemId,
          status_item: checkListPeriodItem.statusItem,
          status_item_nc: checkListPeriodItem.statusNC,
          observacao: checkListPeriodItem.observation,
          log_date: checkListPeriodItem.logDate,
        })

        const pathName = `task_${checkListPeriod.id}`

        for await (const image of checkListPeriodItem.image) {
          const decodeData = Buffer.from(image, 'base64')

          const filename = `${UUID4()}.jpeg`
          console.log(filename)
          const filePath = path.join(__dirname, filename)
          fs.writeFileSync(filePath, decodeData)

          try {
            const client = new Client()

            await client.access({
              host: env.FTP_HOST,
              user: env.FTP_USER,
              password: env.FTP_PASS,
            })

            const remotePath = `/www/sistemas/_lib/img/checkList/${pathName}`
            await client
              .cd(remotePath)
              .then(async () => {
                await client.uploadFrom(
                  filePath,
                  path.join(remotePath, filename),
                )
              })
              .catch(async () => {
                await client.ensureDir(remotePath)
                await client.uploadFrom(
                  filePath,
                  path.join(remotePath, filename),
                )
              })

            client.close()

            fs.unlinkSync(filePath)
          } catch (error) {
            throw CustomError.badRequest('Erro ao acessar servidor FTP')
          }
        }
      }
    }

    // updated
    for await (const productionRegisterItem of data.checkListSchema.updated) {
      const allCheckListPeriod = data.checkListPeriod.updated.filter(
        (item) => item.productionRegisterId === productionRegisterItem.id,
      )

      await this.productionRegisterRepository.update(
        productionRegisterItem.id,
        {
          quilometragem: productionRegisterItem.mileage,
          quilometragem_final: productionRegisterItem.finalMileage,
          DATA: productionRegisterItem.date,
          data_hora_inicio: productionRegisterItem.initialTime,
          data_hora_encerramento: productionRegisterItem.finalTime,
          turno: null,
          status: productionRegisterItem.status === 'open' ? 1 : 0,
          idlog: 0,
        },
      )

      for await (const checkListPeriodItem of allCheckListPeriod) {
        const checkListPeriod = await this.checkListPeriodRepository.update(
          checkListPeriodItem.id,
          {
            status_item: checkListPeriodItem.statusItem,
            status_item_nc: checkListPeriodItem.statusNC,
            observacao: checkListPeriodItem.observation,
            log_date: checkListPeriodItem.logDate,
          },
        )

        const pathName = `task_${checkListPeriod.id}`

        for await (const image of checkListPeriodItem.image) {
          const decodeData = Buffer.from(image, 'base64')

          const filename = UUID4()
          const filePath = path.join(__dirname, filename)
          fs.writeFileSync(filePath, decodeData)

          try {
            const client = new Client()

            await client.access({
              host: env.FTP_HOST,
              user: env.FTP_USER,
              password: env.FTP_PASS,
            })

            const remotePath = `/www/sistemas/_lib/img/checkList/${pathName}`
            await client
              .cd(remotePath)
              .then(async () => {
                await client.uploadFrom(
                  filePath,
                  path.join(remotePath, filename),
                )
              })
              .catch(async () => {
                await client.ensureDir(remotePath)
                await client.uploadFrom(
                  filePath,
                  path.join(remotePath, filename),
                )
              })

            client.close()
          } catch (error) {
            throw CustomError.badRequest('Erro ao acessar servidor FTP')
          }
        }
      }
    }

    return {
      synchronized: true,
    }
  }
}
