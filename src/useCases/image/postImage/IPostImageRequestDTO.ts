import { MultipartFile } from '@fastify/multipart'
import { IUser } from '../../../models/IUser'

export default interface IPostImageRequestDTO {
  user: IUser
  checkListPeriodId: number
  file: MultipartFile
}
