import { prisma } from '../../lib/prisma'
import { IFindByClient, IFindByLogin } from '../../models/IUser'
import IUserRepository from '../IUserRepository'

export default class UserRepository implements IUserRepository {
  private table = prisma.sec_users

  async findByLogin(login: string): Promise<IFindByLogin | null> {
    return await this.table.findFirst({
      select: {
        login: true,
        pswd: true,
        new_pswd: true,
        name: true,
        id_cliente: true,
      },
      where: {
        login,
      },
    })
  }

  async listByClient(clientId: number): Promise<IFindByClient[]> {
    return await this.table.findMany({
      select: {
        login: true,
        name: true,
      },
      where: {
        id_cliente: clientId,
      },
    })
  }
}
