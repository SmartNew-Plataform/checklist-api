import { FastifyRequest, FastifyReply } from 'fastify'
import IController from '../../../models/IController'
import IUseCase from '../../../models/IUseCase'
import IGetBranchByLoginRequestDTO from './IGetBranchByLoginRequestDTO'
import { z } from 'zod'
import { HttpStatusCode } from '@/config/CustomError'

export default class GetBranchByLoginController implements IController {
  constructor(private useCase: IUseCase) {
    this.handle = this.handle.bind(this)
  }

  async handle(req: FastifyRequest, res: FastifyReply) {
    const querySchema = z.object({
      login: z.coerce.string(),
    })

    const request: IGetBranchByLoginRequestDTO = querySchema.parse(req.query)

    const response = await this.useCase.execute(request)

    res.status(HttpStatusCode.OK).send(response)
  }
}
