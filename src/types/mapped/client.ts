import { Client } from 'types/api/user'
import { SvgComponent } from 'types/ui'

import { MappedAccount } from './account'

export interface MappedClient {
  title: Client['name']
  id: Client['id']
  icon: SvgComponent
  accounts?: Array<MappedAccount>
  analytics?: Array<ClientAnalytics>
}

export interface ClientAnalytics {
  accountNumber: string
  availableBalance: number
  availableBalanceBase: number
  baseCurrency: string
  currency: string
  currentBalance: number
  currentBalanceBase: number
  percentageOfTotal: number
}
