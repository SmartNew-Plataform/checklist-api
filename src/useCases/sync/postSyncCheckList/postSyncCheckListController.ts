import { FastifyRequest, FastifyReply } from 'fastify'
import IController from '../../../models/IController'
import IUseCase from '../../../models/IUseCase'
import IPostSyncCheckListRequestDTO from './IPostSyncCheckListRequestDTO'
import { z } from 'zod'
import { HttpStatusCode } from '@/config/CustomError'

export default class PostSyncCheckListController implements IController {
  constructor(private useCase: IUseCase) {
    this.handle = this.handle.bind(this)
  }

  async handle(req: FastifyRequest, res: FastifyReply) {
    const bodySchema = z.object({
      checkListSchema: z.object({
        inserted: z.array(
          z.object({
            _id: z.coerce.string(),
            id: z.coerce.number(),
            date: z.coerce.date(),
            period: z.coerce.string(),
            code: z.coerce.string(),
            description: z.coerce.string(),
            status: z.enum(['open', 'close']),
            equipmentId: z.coerce.number(),
            mileage: z.coerce.number(),
            finalMileage: z.coerce.number(),
            initialTime: z.coerce.date(),
            finalTime: z.coerce.date().nullable(),
            login: z.coerce.string(),
            periodId: z.coerce.number(),
          }),
        ),
        updated: z.array(
          z.object({
            id: z.coerce.number(),
            date: z.coerce.date(),
            period: z.coerce.string(),
            code: z.coerce.string(),
            description: z.coerce.string(),
            status: z.enum(['open', 'close']),
            equipmentId: z.coerce.number(),
            mileage: z.coerce.number(),
            finalMileage: z.coerce.number(),
            initialTime: z.coerce.date(),
            finalTime: z.coerce.date().nullable(),
            login: z.coerce.string(),
            periodId: z.coerce.number(),
          }),
        ),
      }),
      checkListPeriod: z.object({
        inserted: z.array(
          z.object({
            _id: z.coerce.string(),
            id: z.coerce.number(),
            branchId: z.coerce.number(),
            productionRegisterId: z.coerce.string(),
            checkListItemId: z.coerce.number(),
            statusItem: z.coerce.number(),
            statusNC: z.coerce.number().nullable(),
            observation: z.coerce.string().nullable(),
            image: z.array(
              z.object({
                file: z.coerce.string(),
                base64: z.coerce.string(),
              }),
            ),
            logDate: z.coerce.date(),
          }),
        ),
        updated: z.array(
          z.object({
            id: z.coerce.number(),
            branchId: z.coerce.number(),
            productionRegisterId: z.coerce.number(),
            checkListItemId: z.coerce.number(),
            statusItem: z.coerce.number(),
            statusNC: z.coerce.number().nullable(),
            observation: z.coerce.string().nullable(),
            image: z.array(
              z.object({
                file: z.coerce.string(),
                base64: z.coerce.string(),
              }),
            ),
            logDate: z.coerce.date(),
          }),
        ),
      }),
    })

    const request: IPostSyncCheckListRequestDTO = {
      user: req.user,
      ...bodySchema.parse(req.body),
    }

    const response = await this.useCase.execute(request)

    res.status(HttpStatusCode.OK).send(response)
  }
}
