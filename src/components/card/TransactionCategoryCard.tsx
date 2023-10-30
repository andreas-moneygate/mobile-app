import icons from 'assets/icons'
import { TouchableOpacity } from 'components/buttons/TouchableOpacity'
import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import { BodySmall } from 'components/typography/BodySmall'
import { memo, useCallback } from 'react'
import styled from 'styled-components/native'
import { IconProp, LayoutItemProps } from 'types/ui'
import { renderIcon } from 'utils/ui'

interface CardProps {
  title: string
  icon: IconProp
  onPress: (route: string) => void
  route: string
}

export const TransactionCategoryCard = memo((props: CardProps & LayoutItemProps) => {
  const { title, icon, onPress, route, ...restProps } = props
  const onProceed = useCallback(() => onPress(route), [onPress, route])
  return (
    <Card ph="xl" {...restProps} onPress={onProceed}>
      <Row alignItems="center">
        <Column mr="l">{renderIcon(icon)}</Column>
        <Title>{title}</Title>
      </Row>
      <Column>{renderIcon(icons.chevronRight)}</Column>
    </Card>
  )
})

const Card = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colors.purple5};
  border-radius: 8px;
  width: 100%;
  height: 70px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`

const Title = styled(BodySmall)`
  font-weight: 500;
`
