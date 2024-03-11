import LocationRepository from '@/repositories/implementations/LocationRepository'
import GetLocationController from './getLocationController'
import GetLocationUseCase from './getLocationUseCase'

const locationRepository = new LocationRepository()
const useCase = new GetLocationUseCase(locationRepository)

const controller = new GetLocationController(useCase)

export default controller
