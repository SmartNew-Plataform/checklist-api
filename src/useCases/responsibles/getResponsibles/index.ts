import UserRepository from '@/repositories/implementations/UserRepository'
import GetResponsiblesController from './getResponsiblesController'
import GetResponsiblesUseCase from './getResponsiblesUseCase'

const userRepository = new UserRepository()

const useCase = new GetResponsiblesUseCase(userRepository)

const controller = new GetResponsiblesController(useCase)

export default controller
