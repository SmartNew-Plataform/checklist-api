import { Client } from 'basic-ftp'

export default interface IFTPService {
  connect(client: Client): Promise<Boolean>
  close(client: Client): Promise<void>
  download(client: Client, remotePath: string, localPath: string): Promise<void>
}
