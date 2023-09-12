import FTPService from '@/services/implementations/FTPService'
import PostImageController from './postImageController'
import PostImageUseCase from './postImageUseCase'

const ftpService = new FTPService()

const useCase = new PostImageUseCase(ftpService)

const controller = new PostImageController(useCase)

export default controller
