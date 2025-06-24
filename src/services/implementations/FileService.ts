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

  normalizeFileName(fileName: string): string {
    // Separa o nome da extensão
    const lastDotIndex = fileName.lastIndexOf('.')
    if (lastDotIndex === -1) {
      // Caso não tenha extensão
      return fileName
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .toLowerCase()
        .trim()
    }

    const name = fileName.substring(0, lastDotIndex)
    const extension = fileName.substring(lastDotIndex)

    // Normaliza apenas o nome
    const normalizedName = name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .toLowerCase()
      .trim()

    // Retorna o nome normalizado com a extensão original
    return `${normalizedName}${extension}`
  }
}
