import icons from 'assets/icons'
import { SvgComponent } from 'types/ui'

export const currencyEnum: any = {
  USD: 'USD',
  EUR: 'EUR',
  UAH: 'UAH',
  GBP: 'GBP',
  PLN: 'PLN',
  RON: 'RON',
  CHF: 'CHF',
  ILS: 'ILS',
  CAD: 'CAD',
  RUB: 'RUB',
  CZK: 'CZK',
}

export const currencyTitle: any = {
  USD: 'US dollar',
  EUR: 'Euro',
  UAH: 'UA hryvnia',
  GBP: 'Pound sterling',
  PLN: 'Polish zloty',
  RON: 'Romanian leu',
  CHF: 'Swiss frank',
  ILS: 'Israel New Shekel',
  CZK: 'Czech koruna',
}

export const currencyIcons: any = {
  USD: icons.flagUSA,
  EUR: icons.flagEuro,
  UAH: icons.flagUA,
  GBP: icons.flagGBP,
  PLN: icons.flagPLN,
  RON: icons.flagRON,
  CHF: icons.flagCHF,
  ILS: icons.flagILS,
  CAD: icons.flagCAD,
  RUB: icons.flagRUB,
  CZK: icons.flagCZK,
}
export const currencySymbols: any = {
  USD: '$',
  EUR: '€',
  UAH: '₴',
  GBP: '£',
  PLN: 'zł',
  RON: 'lei',
  CHF: 'CHF',
  ILS: '₪',
  CAD: 'C$',
  RUB: '₽',
  CZK: 'Kč',
}

export const CURR_TO_FIXED = 5

export type Account = {
  currency: typeof currencyEnum | string
  balance: number
  title: string
  accountNumber: string
  client?: string
  id?: number
}

export type Transfer = {
  beneficiaryName: string
  beneficiaryAddress: string
  iban: string
  swiftCode: string
  bankName: string
  bankAddress: string
}

export type AccountCustomer = {
  beneficiaryName: string
  accountNumber: string
  icon?: SvgComponent | JSX.Element | undefined
}

export type Currency = {
  currency: typeof currencyEnum | string
  title: string
  rate?: string
  id?: number
}
