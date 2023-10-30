import icons from 'assets/icons'
import { Centered } from 'components/layout/Centered'
import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import { BodySmall } from 'components/typography/BodySmall'
import { Caption } from 'components/typography/Caption'
import { TitleLarge } from 'components/typography/TitleLarge'
import { TitleSmall } from 'components/typography/TitleSmall'
import usePrice from 'hooks/usePrice'
import { memo, useMemo } from 'react'
import styled from 'styled-components/native'
import { IconProp, LayoutItemProps } from 'types/ui'
import { renderIcon } from 'utils/ui'

export interface CardProps {
  icon: IconProp
  currency: string
  accountNumber: string
  balance: number
  currencySymbol: string
  isConnectedToCard: boolean
  containerStyle?: object
}

export const BalanceCard = memo<CardProps & LayoutItemProps>(props => {
  const {
    currencySymbol,
    icon,
    currency,
    accountNumber,
    balance,
    isConnectedToCard,
    ...containerStyle
  } = props

  const { ceilPart, fractionalPart, isPositive } = usePrice(balance)

  const hiddenCardNumber = useMemo(() => `*${accountNumber.slice(-4)}`, [accountNumber])

  return (
    <Card {...containerStyle}>
      <Row justifyContent="space-between">
        <Row alignItems="center">
          <Centered>{renderIcon(icon)}</Centered>
          {isConnectedToCard ? (
            <Row ml={-12} mr={-6}>
              {renderIcon(icons.cardSmall)}
            </Row>
          ) : null}
          <BodySmall ml="s">{currency}</BodySmall>
        </Row>
        <ContainerCardNumber>
          <Caption color="pumpkin85">{hiddenCardNumber}</Caption>
        </ContainerCardNumber>
      </Row>
      <Row alignItems="flex-end">
        <Balance>
          {!isPositive ? '-' : ''}
          {currencySymbol}
          {ceilPart}
        </Balance>
        <Zeros>.{fractionalPart}</Zeros>
      </Row>
    </Card>
  )
})

const Card = styled(Column)`
  background-color: ${({ theme }) => theme.colors.white};
  height: 125px;
  width: 100%;
  padding: ${({ theme }) => theme.spacings.l}px;
  justify-content: space-between;
  border-radius: 10px;
`

const Balance = styled(TitleLarge)`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.purple};
`
const Zeros = styled(TitleSmall)`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.lightMagentaPink};
  margin-bottom: 3px;
`

const ContainerCardNumber = styled(Column)`
  background-color: ${({ theme }) => theme.colors.pumpkin21};
  padding: ${({ theme }) => theme.spacings.xs}px;
  border-radius: 10px;
  height: 25px;
`
