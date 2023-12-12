import CustomError, { HttpStatusCode } from '@/config/CustomError'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import IController from '../../../models/IController'
import IUseCase from '../../../models/IUseCase'
import IPostActionImageRequestDTO from './IPostActionImageRequestDTO'

export default class PostActionImageController implements IController {
  constructor(private useCase: IUseCase) {
    this.handle = this.handle.bind(this)
  }

  async handle(req: FastifyRequest, res: FastifyReply) {
    const queryParams = z.object({
      actionGroupId: z.coerce.number().refine((item) => item > 0),
    })

    const { actionGroupId } = queryParams.parse(req.params)
    const file = await req.file()

    if (!file) {
      throw CustomError.badRequest('Nenhum arquivo enviado')
    }

    const request: IPostActionImageRequestDTO = {
      user: req.user,
      actionGroupId,
      file,
    }

    const response = await this.useCase.execute(request)

    res.status(HttpStatusCode.OK).send(response)
  }
}
