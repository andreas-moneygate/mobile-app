import { PaginatedData } from './common'

export interface Account {
  accountNumber: string
  accountName: string
  accountAlias: string
  availableBalance: number
  availableBalanceBase: number
  baseCurrency: string
  clientId?: string
  clientName?: string
  currency: string
  currentBalance: number
  currentBalanceBase: number
  iban: string
  openingDate: string
  productCode: string
  productDescription: string
  swiftCode: string
  isConnectedToCard: boolean
}

export type Accounts = PaginatedData<Array<Account>>
