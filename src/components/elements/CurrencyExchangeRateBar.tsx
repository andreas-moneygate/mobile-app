import { ActionButton } from 'components/buttons/ActionButton'
import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import { Caption } from 'components/typography/Caption'
import { memo } from 'react'
import styled from 'styled-components/native'
import { CURR_TO_FIXED, currencyEnum, currencySymbols } from 'utils/currencies'

interface BarProps {
  disabled?: boolean
  fromCurr: string
  toCurr: string
  course: number
  onExchange: () => void
}

export const CurrencyExchangeRateBar = memo((props: BarProps) => {
  const { disabled, course, fromCurr, toCurr, onExchange } = props
  return (
    <Row mv="xl" justifyContent="space-between" alignItems="center">
      <ActionButton type="exchangeVertical" onAction={onExchange} disabled={disabled} />
      <Rate ph="s">
        <Caption color="purple85">
          1{currencySymbols[fromCurr]} = {course.toFixed(CURR_TO_FIXED)}&nbsp;
          {currencyEnum[toCurr]}
        </Caption>
      </Rate>
    </Row>
  )
})

const Rate = styled(Column)`
  background-color: ${({ theme }) => theme.colors.mintCream};
  border-radius: 20px;
  justify-content: center;
`
