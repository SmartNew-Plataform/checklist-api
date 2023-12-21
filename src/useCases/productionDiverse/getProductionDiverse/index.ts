import ProductionCategoryDiverseRepository from '@/repositories/implementations/ProductionCategoryDiverseRepository'
import GetProductionDiverseUseCase from './getProductionDiverseUseCase'
import GeProductionDiverseController from './getProductionDiverseController'

const productionDiverseRepository = new ProductionCategoryDiverseRepository()

const useCase = new GetProductionDiverseUseCase(productionDiverseRepository)

const controller = new GeProductionDiverseController(useCase)

export default controller
