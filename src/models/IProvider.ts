export default interface IProvider {
  listByClient: {
    ID: number
    nome_fantasia: string | null
    cnpj: string | null
  }
}
