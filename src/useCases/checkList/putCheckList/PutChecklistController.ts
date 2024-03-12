import { HttpStatusCode } from '@/config/CustomError'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import IController from '../../../models/IController'
import IUseCase from '../../../models/IUseCase'
import { IPutChecklistRequestDTO } from './IPutChecklistRequestDTO'

export default class PutCheckListController implements IController {
  constructor(private useCase: IUseCase) {
    this.handle = this.handle.bind(this)
  }

  async handle(req: FastifyRequest, res: FastifyReply) {
    const bodySchema = z.object({
      id: z.number(),
      finalTime: z.coerce.date().nullable(),
      status: z.enum(['open', 'close']),
    })

    const request: IPutChecklistRequestDTO = {
      user: req.user,
      ...bodySchema.parse(req.body),
    }

    const response = await this.useCase.execute(request)

    res.status(HttpStatusCode.OK).send(response)
  }
}
