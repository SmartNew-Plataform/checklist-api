import BranchXUserRepository from '../repositories/implementations/BranchXUserRepository'
import UserRepository from '../repositories/implementations/UserRepository'
import { FastifyRequest, FastifyReply } from 'fastify'

export default async function verifyJWT(
  req: FastifyRequest,
  res: FastifyReply,
) {
  try {
    if (req.url === '/public/login' || req.url === '/checkList/checklists') {
      // console.log(req)
    }
    await req.jwtVerify()

    const userRepository = new UserRepository()
    const branchXUserRepository = new BranchXUserRepository()
    // console.log('seu token é')
    // console.log(req.user)
    const user = await userRepository.findByLogin(req.user.sub)

    if (!user) {
      return res.status(401).send({
        message: 'Usuário não encontrado',
      })
    }

    const branchBound = await branchXUserRepository.listBoundBranch(
      user.id_cliente || 0,
      user.login,
    )

    req.user = {
      sub: req.user.sub,
      ...user,
      branchBound,
    }
  } catch (error) {
    res.status(401).send({
      message: 'Token verification failed',
      verify: false,
    })
  }
}
