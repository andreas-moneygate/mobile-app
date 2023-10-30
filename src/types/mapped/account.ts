export interface MappedAccount {
  title: string
  currency: string
  balance: number
  accountNumber: string
  id: number
  client: string
  clientId?: string
  beneficiaryAccountNumber?: string
  isConnectedToCard?: boolean
  fields?: Array<any>
  openingDate: string
}
