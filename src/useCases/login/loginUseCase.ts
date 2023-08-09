import md5 from 'md5'
import IUseCase from '../../models/IUseCase'
import IUserRepository from '../../repositories/IUserRepository'
import ILoginRequestDTO from './ILoginRequestDTO'
import CustomError from '../../config/CustomError'

export default class LoginUseCase implements IUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: ILoginRequestDTO) {
    const user = await this.userRepository.findByLogin(data.login)

    if (!user) {
      throw CustomError.notFound('Usuário nao encontrado!')
    }

    const passwordTypedMD5 = md5(data.pass)

    if (passwordTypedMD5 !== user.pswd) {
      throw CustomError.unauthorized('Senha Incorreta')
    }

    return {
      user,
    }
  }
}
