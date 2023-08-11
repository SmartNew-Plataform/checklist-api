import { z } from 'zod'
import BranchXUserRepository from '../repositories/implementations/BranchXUserRepository'
import UserRepository from '../repositories/implementations/UserRepository'
import { FastifyRequest, FastifyReply } from 'fastify'
import CustomError from '@/config/CustomError'

export default async function verifyUser(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const bodySchema = z.object({
    login: z.coerce.string(),
  })

  const userRepository = new UserRepository()
  const branchXUserRepository = new BranchXUserRepository()

  const request = bodySchema.parse(req.query)

  const user = await userRepository.findByLogin(request.login)

  if (!user) {
    throw CustomError.notFound('Usuário não encontrado')
  }

  const branchBound = await branchXUserRepository.listBoundBranch(
    user.id_cliente || 0,
    user.login,
  )

  req.user = {
    sub: '',
    ...user,
    branchBound,
  }
}
