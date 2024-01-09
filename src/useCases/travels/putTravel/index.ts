import PutTravelController from './putTravelController'
import PutTravelUseCase from './putTravelUseCase'

const useCase = new PutTravelUseCase()
const controller = new PutTravelController(useCase)

export default controller
