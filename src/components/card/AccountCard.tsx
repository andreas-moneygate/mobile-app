import icons from 'assets/icons'
import { TouchableOpacity } from 'components/buttons/TouchableOpacity'
import { Centered } from 'components/layout/Centered'
import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import { Body } from 'components/typography/Body'
import { Caption } from 'components/typography/Caption'
import usePrice from 'hooks/usePrice'
import { memo, useCallback } from 'react'
import styled from 'styled-components/native'
import { MappedAccount } from 'types/mapped/account'
import { LayoutItemProps } from 'types/ui'
import { Account, currencyIcons, currencySymbols } from 'utils/currencies'
import { renderIcon } from 'utils/ui'

interface CardProps {
  account: MappedAccount
  containerStyle?: object
  onPress: (data: Account) => void
}

export const AccountCard = memo<CardProps & LayoutItemProps>(props => {
  const { account, onPress, ...restProps } = props
  const { currency, title, balance } = account
  const { ceilPart, fractionalPart, isPositive } = usePrice(balance)
  const onSelect = useCallback(() => onPress(account), [account, onPress])

  return (
    <Card {...restProps} onPress={onSelect}>
      <Row>
        <Centered>{renderIcon(currencyIcons[currency as string])}</Centered>
        {account.isConnectedToCard ? (
          <Row alignItems="center" ml={-12} mr={-6}>
            {renderIcon(icons.cardSmall)}
          </Row>
        ) : null}
        <Column ml="s">
          <Box>
            <Balance>
              {!isPositive ? '-' : ''}
              {currencySymbols[currency as string]}
              {ceilPart}
            </Balance>
            <Caption color="midGray">.{fractionalPart}</Caption>
          </Box>
          <Caption color="midGray">{title}</Caption>
        </Column>
      </Row>
      <Centered>{renderIcon(icons.chevronRight)}</Centered>
    </Card>
  )
})

const Card = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  width: 100%;
`

const Balance = styled(Body)`
  font-weight: 500;
`

const Box = styled(Centered)`
  flex-direction: row;
  justify-content: flex-start;
`
