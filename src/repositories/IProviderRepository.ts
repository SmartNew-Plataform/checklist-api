import IProvider from '@/models/IProvider'

export default interface IProviderRepository {
  listByClient(clientId: number): Promise<IProvider['listByClient'][]>
}
