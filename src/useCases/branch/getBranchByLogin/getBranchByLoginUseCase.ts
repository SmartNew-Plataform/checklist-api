import IUseCase from '../../../models/IUseCase'
import IBranchXUserRepository from '../../../repositories/IBranchXUserRepository'
import IUserRepository from '../../../repositories/IUserRepository'
import IGetBranchByLoginRequestDTO from './IGetBranchByLoginRequestDTO'
import CustomError from '../../../config/CustomError'

export default class GetBranchByLoginUseCase implements IUseCase {
  constructor(
    private userRepository: IUserRepository,
    private branchXUserRepository: IBranchXUserRepository,
  ) {}

  async execute(data: IGetBranchByLoginRequestDTO) {
    const user = await this.userRepository.findByLogin(data.login)

    if (!user) {
      throw CustomError.notFound('Usuário não encontrado')
    }

    const allBranch = await this.branchXUserRepository.listBoundBranch(
      user.id_cliente || 0,
      user.login,
    )

    return allBranch.map((item) => {
      return {
        id: item.branch.ID,
        corporateName: item.branch.filial_numero,
        fantasyName: item.branch.nome_fantasia,
      }
    })
  }
}
