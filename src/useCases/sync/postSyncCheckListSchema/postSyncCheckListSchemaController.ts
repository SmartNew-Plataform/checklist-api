import { HttpStatusCode } from '@/config/CustomError'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import IController from '../../../models/IController'
import IUseCase from '../../../models/IUseCase'
import IPostSyncCheckListSchemaRequestDTO from './IPostSyncCheckListSchemaRequestDTO'
// import IPostSyncCheckListRequestDTO from './IPostSyncCheckListRequestDTO'

export default class PostSyncCheckListSchemaController implements IController {
  constructor(private useCase: IUseCase) {
    this.handle = this.handle.bind(this)
  }

  async handle(req: FastifyRequest, res: FastifyReply) {
    const bodySchema = z.object({
      type: z.string(),
      checkListSchema: z.object({
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
        initialTime: z.coerce.string().transform((value) => new Date(value)),
        finalTime: z.coerce
          .string()
          .transform((value) => (value.length === 0 ? null : new Date(value)))
          .nullable(),
        login: z.coerce.string(),
        periodId: z.coerce.number(),
      }),
    })

    const request: IPostSyncCheckListSchemaRequestDTO = {
      user: req.user,
      ...bodySchema.parse(req.body),
    }

    const response = await this.useCase.execute(request)

    res.status(HttpStatusCode.OK).send(response)
  }
}
