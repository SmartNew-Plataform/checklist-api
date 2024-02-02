export default interface IFileService {
  list(path: string): string[]
  write(path: string, file: Buffer): void
}
