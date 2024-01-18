import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import IController from '../../../models/IController'
import IUseCase from '../../../models/IUseCase'
import IPutEquipmentRequestDTO from './IPutEquipmentRequestDTO'

export default class PutEquipmentController implements IController {
  constructor(private useCase: IUseCase) {
    this.handle = this.handle.bind(this)
  }

  async handle(req: FastifyRequest, res: FastifyReply) {
    const queryParams = z.object({
      id: z.coerce.number().refine((item) => item > 0),
    })

    const { id } = queryParams.parse(req.params)

    const bodySchema = z.object({
      mileage: z.number({ description: 'Erro no formato de mileage ' }),
      hourMeter: z.number({ description: 'Erro no formato de hourMeter ' }),
    })

    const request: IPutEquipmentRequestDTO = {
      user: req.user,
      id,
      ...bodySchema.parse(req.body),
    }

    const response = await this.useCase.execute(request)

    res.status(200).send(response)
  }
}
