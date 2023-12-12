import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import IController from '../../../models/IController'
import IUseCase from '../../../models/IUseCase'
import IPutActionRequestDTO from './IPutActionRequestDTO'

export default class PutActionController implements IController {
  constructor(private useCase: IUseCase) {
    this.handle = this.handle.bind(this)
  }

  async handle(req: FastifyRequest, res: FastifyReply) {
    const queryParams = z.object({
      id: z.coerce.number().refine((item) => item > 0),
    })

    const { id } = queryParams.parse(req.params)

    const bodySchema = z.object({
      title: z.coerce
        .string({ description: 'Erro no formato de title' })
        .optional(),
      responsible: z.coerce
        .string({
          description: 'Erro no formato de responsible',
        })
        .optional(),
      description: z.coerce
        .string({
          description: 'Erro no formato de string',
        })
        .optional(),
      dueDate: z.coerce
        .string()
        .transform((value) => new Date(value))
        .optional(),
      endDate: z.coerce
        .string()
        .transform((value) => new Date(value))
        .optional(),
    })

    const request: IPutActionRequestDTO = {
      user: req.user,
      id,
      ...bodySchema.parse(req.body),
    }

    const response = await this.useCase.execute(request)

    res.status(200).send(response)
  }
}
