import { FastifyRequest, FastifyReply } from 'fastify'
import IController from '../../../models/IController'
import IUseCase from '../../../models/IUseCase'
import { HttpStatusCode } from '@/config/CustomError'
import IGetProviderRequestDTO from './IGetProviderRequestDTO'

export default class GeProviderController implements IController {
  constructor(private useCase: IUseCase) {
    this.handle = this.handle.bind(this)
  }

  async handle(req: FastifyRequest, res: FastifyReply) {
    const request: IGetProviderRequestDTO = { user: req.user }

    const response = await this.useCase.execute(request)

    res.status(HttpStatusCode.OK).send(response)
  }
}
