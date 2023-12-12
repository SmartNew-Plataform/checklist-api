import { MultipartFile } from '@fastify/multipart'
import { IUser } from '../../../models/IUser'

export default interface IPostActionImageRequestDTO {
  user: IUser
  actionGroupId: number
  file: MultipartFile
}
