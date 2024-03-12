import { HttpStatusCode } from '@/config/CustomError'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import IController from '../../../models/IController'
import IUseCase from '../../../models/IUseCase'
import IPostCheckListRequestDTO from './IPostCheckListRequestDTO'

export default class PostCheckListController implements IController {
  constructor(private useCase: IUseCase) {
    this.handle = this.handle.bind(this)
  }

  async handle(req: FastifyRequest, res: FastifyReply) {
    const bodySchema = z.object({
      equipmentId: z.coerce.number().nullable(),
      locationId: z.coerce.number().nullable(),
      periodId: z.coerce.number().nullable(),
      model: z.array(z.coerce.number()),
      initialTime: z.coerce.date(),
      finalTime: z.coerce.date().nullable(),
      status: z.enum(['open', 'close']),
    })

    const request: IPostCheckListRequestDTO = {
      user: req.user,
      ...bodySchema.parse(req.body),
    }

    const response = await this.useCase.execute(request)

    res.status(HttpStatusCode.CREATED).send(response)
  }
}
