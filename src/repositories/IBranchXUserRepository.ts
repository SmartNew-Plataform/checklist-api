import { IListBoundBranch } from '../models/IBranchXUser'

export default interface IBranchXUserRepository {
  listBoundBranch(clientId: number, login: string): Promise<IListBoundBranch[]>
}
