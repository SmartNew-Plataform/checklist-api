import FileService from '@/services/implementations/FileService'
import PostImageController from './postImageController'
import PostImageUseCase from './postImageUseCase'

const fileService = new FileService()

const useCase = new PostImageUseCase(fileService)

const controller = new PostImageController(useCase)

export default controller
