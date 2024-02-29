import IController from '@/models/IController'
import IUseCase from '@/models/IUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import IPutTravelRequestDTO from './IPutTravelRequestDTO'

export default class PutTravelController implements IController {
  constructor(private useCase: IUseCase) {
    this.handle = this.handle.bind(this)
  }

  async handle(req: FastifyRequest, res: FastifyReply) {
    const queryParams = z.object({
      id: z.coerce.number().refine((item) => item > 0),
    })

    const { id } = queryParams.parse(req.params)

    const bodySchema = z.object({
      date: z.string().transform((item) => new Date(item)),
      destination: z.string(),
      startLocation: z.string().nullable(),
      status: z.enum(['due', 'progress', 'paused', 'stopped', 'finished']),
      pauses: z.array(
        z.object({
          started: z.string().transform((item) => new Date(item)),
          ended: z
            .string()
            .transform((item) => new Date(item))
            .nullable(),
          pausedLocation: z.string(),
          resumedLocation: z.string().nullable(),
        }),
      ),
      distanceTraveled: z.number(),
      currentLocation: z.string().nullable(),
    })

    const request: IPutTravelRequestDTO = {
      user: req.user,
      id,
      ...bodySchema.parse(req.body),
    }

    const response = await this.useCase.execute(request)

    res.status(200).send(response)
  }
}
