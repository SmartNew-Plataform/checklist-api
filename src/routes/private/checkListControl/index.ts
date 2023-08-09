import { FastifyInstance } from 'fastify'
import getInfoCheckListControl from '../../../useCases/checkListControl/getInfoCheckListControl'

export default async function checkListControlRoutes(
  checkListControl: FastifyInstance,
) {
  checkListControl.get('/info', getInfoCheckListControl.handle)
}
