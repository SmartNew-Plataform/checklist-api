import ProviderRepository from '@/repositories/implementations/ProviderRepository'
import GetProviderUseCase from './getProviderUseCase'
import GeProviderController from './getProviderController'

const providerRepository = new ProviderRepository()

const useCase = new GetProviderUseCase(providerRepository)

const controller = new GeProviderController(useCase)

export default controller
