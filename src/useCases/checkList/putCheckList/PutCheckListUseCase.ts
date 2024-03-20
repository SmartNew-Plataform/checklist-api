import CustomError from '@/config/CustomError'
import IUseCase from '@/models/IUseCase'
import ISmartCheckListRepository from '@/repositories/ISmartCheckListRepository'
import { IPutChecklistRequestDTO } from './IPutChecklistRequestDTO'

export default class PutCheckListUseCase implements IUseCase {
  constructor(private smartCheckListRepository: ISmartCheckListRepository) {}

  async execute(data: IPutChecklistRequestDTO) {
    if (!data.user.id_cliente) {
      throw CustomError.notFound('Usuário não encontrado!')
    }

    await this.smartCheckListRepository.update(data.id, {
      data_hora_encerramento: data.finalTime,
      status: data.status === 'open' ? 1 : 0,
    })

    return {
      id: data.id,
      updated: true,
    }
  }
}
