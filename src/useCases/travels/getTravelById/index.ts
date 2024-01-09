import GetTravelByIdController from './getTravelByIdController'
import GetTravelByIdUseCase from './getTravelByIdUseCase'

const useCase = new GetTravelByIdUseCase()
const controller = new GetTravelByIdController(useCase)

export default controller
