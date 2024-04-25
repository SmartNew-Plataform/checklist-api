import { FastifyRequest, FastifyReply } from 'fastify'
import IController from '../../models/IController'
import IUseCase from '../../models/IUseCase'
import { z } from 'zod'
import ILoginRequestDTO from './ILoginRequestDTO'
import ILoginResponseDTO from './ILoginResponseDTO'

export default class LoginController implements IController {
  constructor(private useCase: IUseCase) {
    this.handle = this.handle.bind(this)
  }

  async handle(req: FastifyRequest, res: FastifyReply) {
    const bodyParams = z.object({
      login: z.string(),
      pass: z.string(),
    })

    const request: ILoginRequestDTO = bodyParams.parse(req.body)

    const response: ILoginResponseDTO = await this.useCase.execute(request)

    const token = await res.jwtSign(
      {},
      {
        sign: {
          sub: response.user.login,
        },
      },
    )

    console.log('req', req.body)
    console.log(response)

    res.status(200).send({
      token,
      user: {
        login: response.user.login,
        name: response.user.name,
        clientId: response.user.id_cliente,
      },
    })
  }
}
