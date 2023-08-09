import BranchXUserRepository from '../../../repositories/implementations/BranchXUserRepository'
import UserRepository from '../../../repositories/implementations/UserRepository'
import GetBranchByLoginUseCase from './getBranchByLoginUseCase'
import GetBranchByLoginController from './getBranchByLoginController'

const userRepository = new UserRepository()
const branchXUserRepository = new BranchXUserRepository()

const useCase = new GetBranchByLoginUseCase(
  userRepository,
  branchXUserRepository,
)

const controller = new GetBranchByLoginController(useCase)

export default controller
