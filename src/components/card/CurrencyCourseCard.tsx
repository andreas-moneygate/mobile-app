import icons from 'assets/icons'
import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import { Caption } from 'components/typography/Caption'
import { Title } from 'components/typography/Title'
import { memo, useMemo } from 'react'
import styled from 'styled-components/native'
import { currencySymbols } from 'utils/currencies'
import { timePeriod } from 'utils/enum'
import { renderIcon } from 'utils/ui'

interface CurrencyCourseCardProps {
  currency: string
  rate: number
  isIncrease: boolean
  period: string
  date?: string
  percentagePart: string
  rateOfChange: string
}

export const CurrencyCourseCard = memo((props: CurrencyCourseCardProps) => {
  const { currency, rate, isIncrease, period, date, percentagePart, rateOfChange } = props
  const symbol = useMemo(() => (isIncrease ? '+' : '-'), [isIncrease])
  const renderPeriod = useMemo(() => {
    switch (period) {
      case '1d': {
        return timePeriod.DAY
      }
      case '1w': {
        return timePeriod.WEEK
      }
      case '1m': {
        return timePeriod.MONTH
      }
      case '3m': {
        return timePeriod.MMM
      }
      case '6m': {
        return timePeriod.HY
      }
      case '1y': {
        return timePeriod.YEAR
      }
      default:
        return ''
    }
  }, [period])

  return (
    <Card mt="xl" ph="m">
      <Title>
        {currencySymbols[currency as string]}
        {rate}
      </Title>
      <Row justifyContent="space-between" mt="xs">
        <Caption>
          {symbol} {rateOfChange} {currencySymbols[currency as string]}
        </Caption>
        <Row alignItems="center">
          {renderIcon(isIncrease ? icons.caretUp : icons.caretDown)}
          <Caption ml="xs" color={isIncrease ? 'green' : 'red'}>
            {percentagePart}%
          </Caption>
        </Row>
        <Caption color="darkGray">{renderPeriod}</Caption>
        <Caption>{date}</Caption>
      </Row>
    </Card>
  )
})

const Card = styled(Column)`
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.mintCream};
  height: 80px;
  width: 100%;
  border-radius: 10px;
`
