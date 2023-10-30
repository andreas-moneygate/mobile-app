import { ActionButton } from 'components/buttons/ActionButton'
import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import { BodySmall } from 'components/typography/BodySmall'
import { TitleSmall } from 'components/typography/TitleSmall'
import { memo } from 'react'
import styled from 'styled-components/native'
import { currencyEnum, currencyIcons, currencyTitle } from 'utils/currencies'
import { renderIcon } from 'utils/ui'

interface BarProps {
  disabled?: boolean
  fromCurr: string
  toCurr: string
  onExchange: () => void
}

export const CurrentCurrencyBar = memo((props: BarProps) => {
  const { fromCurr, toCurr, onExchange } = props
  return (
    <Column>
      <Currency alignItems="center">
        <Column>
          <TitleSmall>{currencyTitle[toCurr as string]}</TitleSmall>
          <Row alignItems="center" mt="xs">
            <BodySmall mr="m">
              {currencyEnum[fromCurr as string]} / {currencyEnum[toCurr as string]}
            </BodySmall>
            <ActionButton type="exchange" onAction={onExchange} />
          </Row>
        </Column>
        {renderIcon(currencyIcons[fromCurr as string], iconStyle)}
      </Currency>
    </Column>
  )
})

const Currency = styled(Row)`
  justify-content: space-between;
`

const iconStyle = { width: 48, height: 48 }
