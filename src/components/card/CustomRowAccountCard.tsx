import icons from 'assets/icons'
import { TouchableOpacity } from 'components/buttons/TouchableOpacity'
import { Centered } from 'components/layout/Centered'
import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import { BodySmall } from 'components/typography/BodySmall'
import { memo } from 'react'
import styled from 'styled-components/native'
import { renderIcon } from 'utils/ui'

interface CustomRowProps {
  title: string
  onPress: () => void
}

export const CustomRowAccountCard = memo<CustomRowProps>(props => {
  const { title, onPress } = props
  return (
    <Card onPress={onPress}>
      <Row>
        <Centered>
          {renderIcon(icons.clientStatement, dimensions)}
        </Centered>
        <Centered>
          <Column ml="m">
            <Title>{title}</Title>
          </Column>
        </Centered>
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
  margin-top:10px;
`

const Title = styled(BodySmall)`
  font-weight: 500;
`

const dimensions = { height: 40, width: 40 }