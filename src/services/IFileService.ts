export default interface IFileService {
  list(path: string): string[]
  write(path: string, fileName: string, file: Buffer): void
}
