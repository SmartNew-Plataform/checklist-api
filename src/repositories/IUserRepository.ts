import { IFindByClient, IFindByLogin } from '../models/IUser'

export default interface IUserRepository {
  findByLogin(login: string): Promise<IFindByLogin | null>
  listByClient(clientId: number): Promise<IFindByClient[]>
}
