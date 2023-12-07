import { FastifyRequest, FastifyReply } from 'fastify'
import IController from '../../../models/IController'
import IUseCase from '../../../models/IUseCase'
import IGetDashForFilterRequestDTO from './IGetDashForFilterRequestDTO'
import { z } from 'zod'
import { HttpStatusCode } from '@/config/CustomError'
import IGetDashForFilterResponseDTO from './IGetDashForFilterResponseDTO'

export default class GetDashForFilterController implements IController {
  constructor(private useCase: IUseCase) {
    this.handle = this.handle.bind(this)
  }

  async handle(req: FastifyRequest, res: FastifyReply) {
    const querySchema = z.object({
      startDate: z.coerce.date().optional(),
      endDate: z.coerce.date().optional(),
      equipment: z.coerce
        .string()
        .transform((item) => item.split(',').map((value) => Number(value)))
        .or(z.undefined())
        .optional(),
      branch: z
        .string()
        .transform((item) => item.split(',').map((value) => Number(value)))
        .optional(),
    })

    const request: IGetDashForFilterRequestDTO = {
      user: req.user,
      ...querySchema.parse(req.query),
    }

    const response: IGetDashForFilterResponseDTO = await this.useCase.execute(
      request,
    )

    res.status(HttpStatusCode.OK).send(response)
  }
}
