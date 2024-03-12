import { FastifyInstance } from 'fastify'
import getBoundFamily from '../../../useCases/checkList/getBoundFamily'
import getCheckListByLimitTime from '../../../useCases/checkList/getCheckListByLimitTime'
import getChecklists from '../../../useCases/checkList/getChecklists'
import getInfo from '../../../useCases/checkList/getInfo'
import getInfoStatusAction from '../../../useCases/checkList/getInfoStatusAction'
import getStatus from '../../../useCases/checkList/getStatus'
import getStatusAction from '../../../useCases/checkList/getStatusAction'
import patchCloseCheckList from '../../../useCases/checkList/patchCloseCheckList'
import postCheckList from '../../../useCases/checkList/postCheckList'
import putCheckList from '../../../useCases/checkList/putCheckList'
import getInfoByLogin from '../../../useCases/checkListPeriod/getInfoByLogin'
import getCheckListTask from '../../../useCases/checkListTask/getCheckListTask'
import getCheckListByFamily from '../../../useCases/checkListTask/getCheckListTaskByFamily'
import getInfoItem from '../../../useCases/checkListTask/getInfoItem'

export default async function checkListRoutes(checkList: FastifyInstance) {
  checkList.get('/byLimitTime', getCheckListByLimitTime.handle)
  checkList.get('/checklists', getChecklists.handle)
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
  checkList.put('/putCheckList', putCheckList.handle)
}
