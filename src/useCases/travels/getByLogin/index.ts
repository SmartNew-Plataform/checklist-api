import GetByLoginController from './getByLoginController'
import GetByLoginUseCase from './getByLoginUseCase'

const useCase = new GetByLoginUseCase()
const controller = new GetByLoginController(useCase)

export default controller
