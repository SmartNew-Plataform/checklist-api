import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import IController from '../../../models/IController'
import IUseCase from '../../../models/IUseCase'
import IPostActionRequestDTO from './IPostActionRequestDTO'

export default class PostActionController implements IController {
  constructor(private useCase: IUseCase) {
    this.handle = this.handle.bind(this)
  }

  async handle(req: FastifyRequest, res: FastifyReply) {
    const bodySchema = z.object({
      title: z.coerce.string({ description: 'Erro no formato de title' }),
      responsible: z.coerce.string({
        description: 'Erro no formato de responsible',
      }),
      description: z.coerce.string({
        description: 'Erro no formato de string',
      }),
      checklistPeriodId: z.coerce.number({
        description: 'Erro no formato de checklistPeriodId',
      }),
      startDate: z.coerce.string(),
      dueDate: z.coerce.string(),
      endDate: z.coerce.string().nullable(),
      checklistId: z.coerce.number(),
      // equipmentId: z.coerce.number({
      //   description: 'Erro no formato de equipmentId',
      // }),
    })

    const request: IPostActionRequestDTO = {
      user: req.user,
      ...bodySchema.parse(req.body),
    }

    const response = await this.useCase.execute(request)

    res.status(200).send(response)
  }
}
