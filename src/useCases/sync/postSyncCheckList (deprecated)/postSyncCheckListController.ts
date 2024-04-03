import { HttpStatusCode } from '@/config/CustomError'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import IController from '../../../models/IController'
import IUseCase from '../../../models/IUseCase'
import IPostSyncCheckListRequestDTO from './IPostSyncCheckListRequestDTO'

export default class PostSyncCheckListController implements IController {
  constructor(private useCase: IUseCase) {
    this.handle = this.handle.bind(this)
  }

  async handle(req: FastifyRequest, res: FastifyReply) {
    const bodySchema = z.object({
      checkListSchema: z.object({
        inserted: z.array(
          z.object({
            _id: z.coerce.string({ description: 'Erro no formato de _id' }),
            id: z.coerce.number(),
            date: z.coerce.string().transform((value) => new Date(value)),
            period: z.coerce.string(),
            code: z.coerce.string(),
            description: z.coerce.string(),
            status: z.enum(['open', 'close']),
            equipmentId: z.coerce.number(),
            mileage: z.coerce.number(),
            finalMileage: z.coerce.number(),
            initialTime: z.coerce
              .string()
              .transform((value) => new Date(value)),
            finalTime: z.coerce
              .string()
              .transform((value) =>
                value.length === 0 ? null : new Date(value),
              )
              .nullable(),
            login: z.coerce.string(),
            periodId: z.coerce.number(),
          }),
        ),
        updated: z.array(
          z.object({
            id: z.coerce.number(),
            date: z.coerce.string().transform((value) => new Date(value)),
            period: z.coerce.string(),
            code: z.coerce.string(),
            description: z.coerce.string(),
            status: z.enum(['open', 'close']),
            equipmentId: z.coerce.number(),
            mileage: z.coerce.number(),
            finalMileage: z.coerce.number(),
            initialTime: z.coerce
              .string()
              .transform((value) => new Date(value)),
            finalTime: z.coerce
              .string()
              .transform((value) =>
                value.length === 0 ? null : new Date(value),
              )
              .nullable(),
            login: z.coerce.string(),
            periodId: z.coerce.number(),
          }),
        ),
      }),
      checkListPeriod: z.object({
        inserted: z.array(
          z.object({
            _id: z.coerce.string({ description: 'Erro no formato de _id' }),
            id: z.coerce.number({ description: 'Erro no formato de id' }),
            branchId: z.coerce.number({
              description: 'Erro no formato de branchId',
            }),
            productionRegisterId: z.coerce.string({
              description: 'Erro no formato de productionRegisterId',
            }),
            checkListItemId: z.coerce.number({
              description: 'Erro no formato de checkListItemId',
            }),
            statusItem: z.coerce.number({
              description: 'Erro no formato de statusItem',
            }),
            statusNC: z.coerce
              .number({ description: 'Erro no formato de statusNC' })
              .nullable(),
            observation: z.coerce.string().nullable(),
            logDate: z.coerce.string().transform((value) => new Date(value)),
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
            logDate: z.coerce.string().transform((value) => new Date(value)),
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
