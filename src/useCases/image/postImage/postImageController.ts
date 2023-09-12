import { HttpStatusCode } from '@/config/CustomError'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import IController from '../../../models/IController'
import IUseCase from '../../../models/IUseCase'
import IPostImageRequestDTO from './IPostImageRequestDTO'

export default class PostImageController implements IController {
  constructor(private useCase: IUseCase) {
    this.handle = this.handle.bind(this)
  }

  async handle(req: FastifyRequest, res: FastifyReply) {
    const queryParams = z.object({
      checkListPeriodId: z.coerce.number(),
    })

    const { checkListPeriodId } = queryParams.parse(req.params)

    const request: IPostImageRequestDTO = {
      user: req.user,
      checkListPeriodId,
      file: req.file(),
    }

    const response = await this.useCase.execute(request)

    res.status(HttpStatusCode.OK).send(response)
  }
}
