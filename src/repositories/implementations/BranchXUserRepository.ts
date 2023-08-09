import { prisma } from '@/lib/prisma'
import IBranchXUserRepository from '../IBranchXUserRepository'
import { IListBoundBranch } from '../../models/IBranchXUser'

export default class BranchXUserRepository implements IBranchXUserRepository {
  private table = prisma.sofman_filiais_x_usuarios

  async listBoundBranch(
    clientId: number,
    login: string,
  ): Promise<IListBoundBranch[]> {
    return await this.table.findMany({
      select: {
        branch: {
          select: {
            ID: true,
            filial_numero: true,
            nome_fantasia: true,
          },
        },
      },
      where: {
        id_cliente: clientId,
        id_user: login,
        branch: {
          status: 1,
        },
      },
    })
  }
}
