import { prisma } from '@/lib/prisma'
import IProvider from '@/models/IProvider'
import IProviderRepository from '../IProviderRepository'

export default class ProviderRepository implements IProviderRepository {
  private table = prisma.sofman_cad_fornecedores

  async listByClient(clientId: number): Promise<IProvider['listByClient'][]> {
    const providers = await this.table.findMany({
      select: {
        ID: true,
        nome_fantasia: true,
        cnpj: true,
      },
      where: {
        ID_cliente: clientId,
      },
    })

    return providers
  }
}
