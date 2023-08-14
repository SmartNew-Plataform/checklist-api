import { Client } from 'basic-ftp'
import IFTPService from '../IFTPService'
import { env } from 'process'

export default class FTPService implements IFTPService {
  async connect(client: Client): Promise<Boolean> {
    try {
      await client.access({
        host: env.FTP_HOST,
        user: env.FTP_USER,
        password: env.FTP_PASS,
      })
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  async close(client: Client): Promise<void> {
    await client.close()
  }

  async download(
    client: Client,
    remotePath: string,
    localPath: string,
  ): Promise<void> {
    await client.downloadTo(localPath, remotePath)
  }
}
