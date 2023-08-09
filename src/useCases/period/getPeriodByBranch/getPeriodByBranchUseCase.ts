import IUseCase from '../../../models/IUseCase'
import IGetPeriodByBranchRequestDTO from './IGetPeriodByBranchRequestDTO'
import IPeriodRepository from '../../../repositories/IPeriodRepository'

export default class GetPeriodByBranchUseCase implements IUseCase {
  constructor(private periodRepository: IPeriodRepository) {}

  async execute(data: IGetPeriodByBranchRequestDTO) {
    const period = await this.periodRepository.byBranch(data.branchId)

    const response = period.map((item) => {
      return {
        id: item.id,
        period: item.turno,
      }
    })

    return { period: response }
  }
}
