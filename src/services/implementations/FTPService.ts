import { Client } from 'basic-ftp'
import IFTPService from '../IFTPService'

export default class FTPService implements IFTPService {
  async download(
    client: Client,
    remotePath: string,
    localPath: string,
  ): Promise<void> {
    await client.downloadTo(localPath, remotePath)
  }
}
