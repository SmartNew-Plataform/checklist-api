import { FastifyInstance } from 'fastify'
import getCheckListByLimitTime from '../../../useCases/checkList/getCheckListByLimitTime'
import postCheckList from '../../../useCases/checkList/postCheckList'
import getCheckListByFamily from '../../../useCases/checkListTask/getCheckListTaskByFamily'
import getCheckListTask from '../../../useCases/checkListTask/getCheckListTask'
import getInfo from '../../../useCases/checkList/getInfo'
import getBoundFamily from '../../../useCases/checkList/getBoundFamily'
import getInfoItem from '../../../useCases/checkListTask/getInfoItem'
import getStatus from '../../../useCases/checkList/getStatus'
import getInfoByLogin from '../../../useCases/checkListPeriod/getInfoByLogin'
import getStatusAction from '../../../useCases/checkList/getStatusAction'
import getInfoStatusAction from '../../../useCases/checkList/getInfoStatusAction'
import patchCloseCheckList from '../../../useCases/checkList/patchCloseCheckList'

export default async function checkListRoutes(checkList: FastifyInstance) {
  checkList.get('/byLimitTime', getCheckListByLimitTime.handle)
  checkList.post('/', postCheckList.handle)
  checkList.get('/taskByFamily', getCheckListByFamily.handle)
  checkList.get('/task', getCheckListTask.handle)
  checkList.get('/info', getInfo.handle)
  checkList.get('/boundFamily', getBoundFamily.handle)
  checkList.get('/infoItem', getInfoItem.handle)
  checkList.get('/status', getStatus.handle)
  checkList.get('/period/infoByLogin', getInfoByLogin.handle)
  checkList.get('/statusAction', getStatusAction.handle)
  checkList.get('/infoStatusAction', getInfoStatusAction.handle)
  checkList.patch('/close', patchCloseCheckList.handle)
}
