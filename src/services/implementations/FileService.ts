import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'fs'
import IFileService from '../IFileService'

export default class FileService implements IFileService {
  list(path: string): string[] {
    const directoryExists = existsSync(path)
    if (directoryExists) {
      const files = readdirSync(path)
      return files
    } else {
      return []
    }
  }

  write(path: string, fileName: string, file: Buffer): void {
    if (!existsSync(path)) {
      mkdirSync(path, { recursive: true })
    }
    writeFileSync(`${path}/${fileName}`, file)
  }
}
