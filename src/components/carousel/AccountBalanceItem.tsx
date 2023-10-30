import { BalanceCard, CardProps } from 'components/card/BalanceCard'
import { memo } from 'react'
import { currencyIcons, currencySymbols } from 'utils/currencies'

interface Props {
  item: CardProps & { title: string }
}

export const AccountBalanceItem = memo(({ item }: Props) => (
  <BalanceCard
    {...item}
    currency={item.title}
    icon={currencyIcons[item.currency]}
    currencySymbol={currencySymbols[item.currency]}
  />
))
