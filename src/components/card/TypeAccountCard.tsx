import icons from 'assets/icons'
import { TouchableOpacity } from 'components/buttons/TouchableOpacity'
import { Centered } from 'components/layout/Centered'
import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import { BodySmall } from 'components/typography/BodySmall'
import { Caption } from 'components/typography/Caption'
import { memo, useCallback } from 'react'
import styled from 'styled-components/native'
import { MappedAccount } from 'types/mapped/account'
import { LayoutItemProps } from 'types/ui'
import { Account, currencyIcons } from 'utils/currencies'
import { renderIcon } from 'utils/ui'

interface CardProps {
  account: MappedAccount
  containerStyle?: object
  onPress: (account: Account) => void
}

export const TypeAccountCard = memo<CardProps & LayoutItemProps>(props => {
  const { account, onPress, ...restProps } = props
  const { title, currency, accountNumber } = account
  const onProceed = useCallback(() => onPress(account), [account, onPress])
  return (
    <Card {...restProps} onPress={onProceed}>
      <Row>
        <Centered>{renderIcon(currencyIcons[currency as string], dimensions)}</Centered>
        {account.isConnectedToCard ? (
          <Row alignItems="center" ml={-14} mr={-8}>
            {renderIcon(icons.cardSmall, { width: 24, height: 24 })}
          </Row>
        ) : null}
        <Column ml="m">
          <Title>{title}</Title>
          <Caption color="midGray">{accountNumber}</Caption>
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

const Title = styled(BodySmall)`
  font-weight: 500;
`

const dimensions = { height: 40, width: 40 }
