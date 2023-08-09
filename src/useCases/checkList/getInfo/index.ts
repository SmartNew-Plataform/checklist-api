import ProductionRegisterRepository from '../../../repositories/implementations/ProductionRegisterRepository'
import GetInfoController from './getInfoController'
import GetInfoUseCase from './getInfoUseCase'

const productionRegisterRepository = new ProductionRegisterRepository()

const useCase = new GetInfoUseCase(productionRegisterRepository)

const controller = new GetInfoController(useCase)

export default controller
