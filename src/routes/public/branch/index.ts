import { FastifyInstance } from 'fastify'
import getBranchByLogin from '../../../useCases/branch/getBranchByLogin'

export default async function branchRoutes(branch: FastifyInstance) {
  branch.get('/byLogin', getBranchByLogin.handle)
}
