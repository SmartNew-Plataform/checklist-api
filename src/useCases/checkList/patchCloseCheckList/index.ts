import ProductionRegisterRepository from '../../../repositories/implementations/ProductionRegisterRepository'
import PatchCloseCheckListUseCase from './patchCloseCheckListUseCase'
import PatchCloseCheckListController from './patchCloseCheckListController'

const productionRegisterRepository = new ProductionRegisterRepository()

const useCase = new PatchCloseCheckListUseCase(productionRegisterRepository)

const controller = new PatchCloseCheckListController(useCase)

export default controller
