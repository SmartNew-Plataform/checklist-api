import FTPService from '@/services/implementations/FTPService'
import PostActionImageController from './postActionImageController'
import PostActionImageUseCase from './postImageUseCase'

const ftpService = new FTPService()

const useCase = new PostActionImageUseCase(ftpService)

const controller = new PostActionImageController(useCase)

export default controller
