import { Client } from 'basic-ftp'

export default interface IFTPService {
  download(client: Client, remotePath: string, localPath: string): Promise<void>
}
