import FileService from '@/services/implementations/FileService'
import PostActionImageController from './postActionImageController'
import PostActionImageUseCase from './postImageUseCase'

const fileService = new FileService()

const useCase = new PostActionImageUseCase(fileService)

const controller = new PostActionImageController(useCase)

export default controller
