import IUseCase from '@/models/IUseCase'
import IFTPService from '@/services/IFTPService'
import { Client } from 'basic-ftp'
import IPostImageRequestDTO from './IPostImageRequestDTO'
import IPostImageResponseDTO from './IPostImageResponseDTO'

export default class PostImageUseCase implements IUseCase {
  constructor(private FTPService: IFTPService) {}

  async execute(data: IPostImageRequestDTO): Promise<IPostImageResponseDTO> {
    const client = new Client()
    await this.FTPService.connect(client).catch((error) => {
      console.log('Nao Acessou FTP' + error)
    })
    console.log(data.file)

    return {
      inserted: true,
    }
  }
}

// export default class GetPeriodUseCase implements IUseCase {
//   constructor(private periodRepository: IPeriodRepository) {}

//   async execute(data: IGetPeriodRequestDTO) {
//     const allPeriod = await this.periodRepository.byClient(
//       data.user.id_cliente || 0,
//     )

//     const response: IGetPeriodResponseDTO[] = allPeriod.map((item) => {
//       return {
//         id: item.id,
//         period: item.turno,
//         clientId: item.id_cliente,
//         branchId: item.id_filial,
//       }
//     })

//     return response
//   }
// }
