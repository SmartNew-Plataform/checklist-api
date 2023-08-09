import { IUser } from '../models/IUser'
import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    // payload: { id: number }
    user: IUser
  }
}
