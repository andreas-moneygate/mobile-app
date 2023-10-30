import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import { CurrencyRatesPicker } from 'components/picker/CurrencyRatesPicker'
import { Body } from 'components/typography/Body'
import { TitleLarge } from 'components/typography/TitleLarge'
import { TitleSmall } from 'components/typography/TitleSmall'
import usePrice from 'hooks/usePrice'
import { memo, useCallback, useMemo } from 'react'
import styled from 'styled-components/native'
import { LayoutItemProps } from 'types/ui'
import { Currency, currencyEnum, currencySymbols } from 'utils/currencies'

interface BalanceProps {
  balance?: number
  currencySymbol?: string
  currency?: string
  currenciesToChoose?: Array<Currency>
  setCurrency?: (currency: string) => void
  inHeader?: boolean
}

export const BalanceBar = memo((props: BalanceProps & LayoutItemProps) => {
  const {
    balance = 0,
    currencySymbol = currencySymbols.EUR,
    inHeader,
    currency,
    currenciesToChoose,
    setCurrency,
    ...restProps
  } = props

  const { ceilPart, fractionalPart } = usePrice(balance)

  const initialCurrency = useMemo(
    () => ({
      currency,
      title:
        currenciesToChoose?.find(curr => curr.currency === currency)?.title || currencyEnum.EUR,
    }),
    [currency, currenciesToChoose],
  )

  const handleSelect = useCallback(
    ({ currency }: Currency) => {
      if (setCurrency) {
        setCurrency(currency)
      }
    },
    [setCurrency],
  )

  return (
    <Column {...restProps}>
      {inHeader ? (
        <Row alignItems="flex-end">
          <TitleSmall color="white" allowFontScaling={false}>
            {currencySymbol}
            {ceilPart}
          </TitleSmall>
          <ZerosHeader>.{fractionalPart}</ZerosHeader>
        </Row>
      ) : (
        <>
          <Row>
            <CurrencyRatesPicker
              data={currenciesToChoose}
              initialCurrency={initialCurrency}
              onSelect={handleSelect}
              onHomeScreen
            />
          </Row>
          <Row alignItems="flex-end">
            <Title>
              {currencySymbol}
              {ceilPart}
            </Title>
            <Zeros>.{fractionalPart}</Zeros>
          </Row>
        </>
      )}
    </Column>
  )
})

const Title = styled(TitleLarge)`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};
`
const Zeros = styled(TitleSmall)`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.lightMagentaPink};
  margin-bottom: 3px;
`

const ZerosHeader = styled(Body)`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.lightMagentaPink};
  margin-bottom: 2px;
`
