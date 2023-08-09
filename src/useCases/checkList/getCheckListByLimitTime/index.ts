import ProductionRegisterRepository from '../../../repositories/implementations/ProductionRegisterRepository'
import GetCheckListByLimitTimeUseCase from './getCheckListByLimitTimeUseCase'
import GetCheckListByLimitTimeController from './getCheckListByLimitTimeController'

const productionRegisterRepository = new ProductionRegisterRepository()

const useCase = new GetCheckListByLimitTimeUseCase(productionRegisterRepository)

const controller = new GetCheckListByLimitTimeController(useCase)

export default controller
