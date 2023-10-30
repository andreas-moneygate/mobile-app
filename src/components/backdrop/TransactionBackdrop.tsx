import { Centered } from 'components/layout/Centered'
import { Column } from 'components/layout/Column'
import { Body } from 'components/typography/Body'
import { Caption } from 'components/typography/Caption'
import { TitleBiggest } from 'components/typography/TitleBiggest'
import usePrice from 'hooks/usePrice'
import { memo, useMemo } from 'react'
import styled from 'styled-components/native'
import { LayoutItemProps, SvgComponent } from 'types/ui'
import { currencySymbols } from 'utils/currencies'
import { formatDate } from 'utils/date'
import { createTextLogo, renderIcon, upFirstSymbol } from 'utils/ui'

interface TransactionBackdropProps {
  currency: string
  grosAmount: number
  status: string
  date: string
  icon: SvgComponent
  beneficiaryName: string
}

export const TransactionBackdrop = memo((props: TransactionBackdropProps & LayoutItemProps) => {
  const { currency, grosAmount, status, date, icon, beneficiaryName } = props
  const currencySymbol = useMemo(() => currencySymbols[currency], [currency])

  const { ceilPart, fractionalPart, isPositive } = usePrice(grosAmount)

  const formattedDate = useMemo(() => formatDate(date), [date])

  const textLogo = useMemo(() => createTextLogo(beneficiaryName || ''), [beneficiaryName])

  return (
    <Column alignItems="center" mb="xxl">
      <IconWrapper>
        {icon ? renderIcon(icon, iconStyle) : <Body color="white">{textLogo}</Body>}
      </IconWrapper>
      <Caption color="lightMagentaPink" mv="m">
        {formattedDate}
      </Caption>
      <TitleBiggest color="white">
        {!isPositive ? '-' : '+'}
        {currencySymbol}
        {ceilPart}
        {fractionalPart ? `.${fractionalPart}` : '.00'}
      </TitleBiggest>
      <Caption color="white">{upFirstSymbol(status)}</Caption>
    </Column>
  )
})

const IconWrapper = styled(Centered)`
  width: 54px;
  height: 54px;
  border-radius: 27px;
  background-color: ${({ theme }) => theme.colors.white20};
`

const iconStyle = { width: 44, height: 44 }
