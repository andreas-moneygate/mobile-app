import icons from 'assets/icons'
import { TouchableOpacity } from 'components/buttons/TouchableOpacity'
import { Centered } from 'components/layout/Centered'
import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import { BodySmall } from 'components/typography/BodySmall'
import { Caption } from 'components/typography/Caption'
import { isNumber } from 'lodash'
import { memo, useMemo } from 'react'
import styled from 'styled-components/native'
import { LayoutItemProps, SvgComponent } from 'types/ui'
import { renderIcon } from 'utils/ui'

interface ClientCardProps {
  title: string
  icon: SvgComponent
  numberOfAccounts?: number | undefined
  onPress: () => void
}

export const ActionCard = memo((props: ClientCardProps & LayoutItemProps) => {
  const { title, numberOfAccounts, icon, onPress, ...restProps } = props
  const formatNumberOfAccounts = useMemo(
    () =>
      `${numberOfAccounts} account${isNumber(numberOfAccounts) && numberOfAccounts > 1 ? 's' : ''}`,
    [numberOfAccounts],
  )
  return (
    <Card {...restProps} onPress={onPress} alignItems={numberOfAccounts ? 'flex-start' : 'center'}>
      <Row>
        {icon && <IconContainer>{renderIcon(icon)}</IconContainer>}
        <Column ml="m" justifyContent="center">
          <Title>{title}</Title>
          {numberOfAccounts && <Caption color="midGray">{formatNumberOfAccounts}</Caption>}
        </Column>
      </Row>
      {renderIcon(icons.chevronRight)}
    </Card>
  )
})

const Card = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.white};
  height: 40px;
  width: 100%;
`

const IconContainer = styled(Centered)`
  background-color: ${({ theme }) => theme.colors.lightPowder};
  height: 40px;
  width: 40px;
  border-radius: 20px;
`

const Title = styled(BodySmall)`
  font-weight: 500;
`
